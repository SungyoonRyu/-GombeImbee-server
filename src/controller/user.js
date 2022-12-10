import sql from "../db/index.js";

const signin = async (req, res) => {
    if (req.body == null) {
        res.sendStatus(400);
        return;
    }

    let query = "SELECT * FROM user WHERE id=?;";
    sql.query(query, [req.body.id], 
        function (error, results) { 
            if (error) {
                console.error(error);
                res.sendStatus(400);
                return;
            }
            
            if (results.length === 0) 
                res.sendStatus(401);
            else if (results[0].password != req.body.pw)
                res.sendStatus(402);
            else res.send(results[0]);
        })
}

const signup = async (req, res) => {
    if (req.body == null) {
        res.sendStatus(400);
        return;
    }

    let findId = false;

    let query = "SELECT * FROM user WHERE id=?;";
    sql.query(query, [req.body.id],
        function (error, results) {
            if (results.length > 0) {
                res.sendStatus(401);
                findId = true;
                return;
            }
        })

    if (findId == true) return; 
    query = "INSERT INTO user(id, password, name, email) VALUES (?, ?, ?, ?);";
    sql.query(query, [req.body.id, req.body.pw, req.body.name, req.body.email], 
        function (error, results) {
            if (error) {
                res.sendStatus(400);
                return;
            }
            res.sendStatus(200);
        }
    )
}

const user = {
    signin,
    signup
};

export default user;