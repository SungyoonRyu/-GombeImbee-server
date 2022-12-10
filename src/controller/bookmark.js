import sql from "../db/index.js";

const add = async (req, res) => {
    let query = "INSERT INTO bookmark(title, url, description, tag, link, group_id) VALUES(?, ?, ?, ?, ?, ?)";
    console.log(req.query.title, req.query.url, req.query.description, req.query.tag, req.query.link, req.query.group_id);
    sql.query(query, [req.query.title, req.query.url, req.query.description, req.query.tag, req.query.link, req.query.group_id],
        (error, results) => {
            if (error) {
                console.error(error);
                res.sendStatus(400);
                return;
            }
            res.sendStatus(200);
        });
    return true;
}

// req.body = { bookmark id }
const del = async (req, res) => {
    let query = "DELETE FROM bookmark WHERE id = ?;";
    console.log(req.query.id);
    sql.query(query, [req.query.id],
        (error, results) => {
            if (error) {
                console.error(error);
                res.sendStatus(400);
                return;
            }
            res.sendStatus(200);
        });
    return true;
}

const get = async (req, res) => {
    let query ="SELEC * FROM bookmark WHERE id = ?;";
    console.log("get bookmark");
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
    return true;
}

const search = async (req, res) => {
    var _str = '"%' + req.body.str + '%"';
    var _workspace_id = req.body.workspace_id;
    console.log(req.body.str);
    console.log(req.body.workspace_id);
    let query ="select * from bookmark left join fgroup on bookmark.group_id = fgroup.id where workspace_id = ? and bookmark.title like " + _str  + 
    " union " +
    "select * from bookmark left join fgroup on bookmark.group_id = fgroup.id where workspace_id = ? and bookmark.url like " + _str  +
    " union " +
    "select * from bookmark left join fgroup on bookmark.group_id = fgroup.id where workspace_id = ? and bookmark.description like " + _str +
    " union " +
    "select * from bookmark left join fgroup on bookmark.group_id = fgroup.id where workspace_id = ? and bookmark.link like " + _str + ";";
    sql.query(query, [_workspace_id, _workspace_id, _workspace_id, _workspace_id],
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
    return true;
}

const bookmark = {
    add,
    del,
    get,
    search
};

export default bookmark;