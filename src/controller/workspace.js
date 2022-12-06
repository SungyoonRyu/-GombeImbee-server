import sql from "../db/index.js";

const workspace_list = async (req, res) => {
    let query = "SELECT * FROM workspace WHERE id IN (SELECT workspace_id FROM user_workspace WHERE user_id = ?);";
    sql.query(query, [req.query.id],
        (error, results) => {
            if (error) {
                console.error(error);
                res.sendStatus(400);
                return;
            }

            if (results.length === 0) 
                res.sendStatus(401);
            else {
                res.send(results);
            }
        });
}

// req에 workspace id 실어서 보냄
const get_node = async (req, res) => {
    let query = "select bookmark.id, bookmark.title, bookmark.description, bookmark.url, bookmark.group_id, bookmark.tag, fgroup.title as fgroup_title from bookmark left join fgroup ON bookmark.group_id = fgroup.id where bookmark.group_id in (select id from fgroup where fgroup.workspace_id = ?) ;";
    sql.query(query, [req.query.id],
        (error, results) => {
            if (error) {
            console.error(error);
            res.sendStatus(400);
            return;
        }

        if (results.length === 0) 
            res.send([]);
        else {
            res.send(results);
        }
    });
}

// req.doby = { workspace title, workspace owner user id}
const add = async (req, res) => {
    query = "INSERT INTO workspace(title, own_user_id) VALUES(?, ?);";
    sql.query(query, [req.body.title, req.body.own_user_id],
        (error, results) => {
            if (error) {
                console.error(error);
                res.sendStatus(400);
                return;
            }
            res.sendState(200);
        });
}

// req.body = { workspace id }
const del = async (req, res) => {
    query = "DELETE FROM workspace WHERE id = ?;";
    sql.query(query, [req.body.id],
        (error, results) => {
            if (error) {
                console.error(error);
                res.sendStatus(400);
                return;
            }
            res.sendState(200);
        });
}

const workspace = {
    workspace_list,
    get_node,
    add,
    del,
};

export default workspace;