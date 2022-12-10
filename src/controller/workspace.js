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
    let query = "insert into workspace(title, own_user_id) values (?, ?);";
    console.log("add log :  " + req.body.title + " \n" + req.body.own_user_id);
    sql.query(query, [req.body.title, req.body.own_user_id],
        (error, results) => {
            if (error) {
                console.error(error);
                console.log("error add");
                res.sendStatus(400);
                return;
            }
            let query2 = "insert into user_workspace(user_id, workspace_id) values(?, ?);";
            sql.query(query2, [req.body.own_user_id, results.insertId],
                    (error, results) => {
                        if(error) {
                            console.error(error);
                            res.sendStatus(400);
                            return;
                        }
                    }
                )
            res.sendStatus(200);
        });
}

// req.body = { workspace id }
const del = async (req, res) => {
    let query = "delete from workspace where id = ?;";
    console.log("function delete"); 
    console.log(req.body);
    sql.query(query, [req.body.workspaceid],
        (error, results) => {
            if (error) {
                console.error(error);
                res.sendStatus(400);
                return;
            }
            res.sendStatus(200);
        });
}

//// req.body = {workspace_id }
const workspace_member = async (req, res) => {
    let query = "select name, id from user where id in (select user_id from user_workspace where workspace_id = (?));";
    console.log("workspace_member function"); 
    console.log(req.body.workspace_id);
    sql.query(query, [req.body.workspace_id],
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

// req.body = {user_id workspace_id }
const add_workspace_member = async (req, res) => {
    let query = "insert into user_workspace(user_id, workspace_id) values (?, ? );";
    console.log("add_workspace_member function"); 
    console.log(req.body);
    sql.query(query, [req.body.user_id, req.body.workspace_id],
        (error, results) => {
            if (error) {
                console.error(error);
                res.sendStatus(400);
                return;
            }
            res.sendStatus(200);
        });
}

// req.body = { user_id workspace id }
const del_workspace_member = async (req, res) => {
    let query = "delete from user_workspace where user_id = ? and workspace_id = ?;";
    console.log("function delete"); 
    console.log(req.body.user_id, req.body.workspace_id);
    sql.query(query, [req.body.user_id, req.body.workspace_id],
        (error, results) => {
            if (error) {
                console.error(error);
                res.sendStatus(400);
                return;
            }
            res.sendStatus(200);
        });
}

const workspace = {
    workspace_list,
    get_node, 
    add,
    del,
    workspace_member,
    add_workspace_member,
    del_workspace_member,
};

export default workspace;