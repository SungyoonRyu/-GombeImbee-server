import sql from "../db/index.js";

// req에 workspace 정보
const group_list = async (req, res) => {
    let query = "SELECT * FROM fgroup WHERE workspace_id = ?;";
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
    return true;
}

// req.body = { group title, workspace_id }
const add = async (req, res) => {
    query ="INSERT INTO fgroup(title, workspace_id) VALUES(?, ?);";
    sql.query(query, [req.body.title, req.body.workspace_id],
        (error, results) => {
            if (error) {
                console.error(error);
                res.sendStatus(400);
                return;
            }
            res.sendState(200);
        });
}

// req.body = { group id }
const del = async (req, res) => {
    query = "DELETE FROM fgroup WHERE id = ?;";
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

const group = {
    group_list,
    add,
    del,
};

export default group;