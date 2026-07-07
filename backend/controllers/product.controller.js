import pool from "../config/db.js";

export const getProducts = async (req, res) => {
    try {
        const result = await pool.query(
       `SELECT * FROM product ORDER BY id`    
        );
        res.status(200).json({success: true, data: result.rows});
    } catch (error) {
        console.log("Error in fetching products: ", error.message);
        res.status(500).json({ success: false, message: "Server Error"});
    }
}

export const createProduct = async (req, res) => {
    const {name, price, image} = req.body;

    if(!name || !price || !image){
        res.status(400).json({ success: false, message: "Please provide all fields"});
    }

    try {
        const result = await pool.query(
       `INSERT INTO product(name, price, image)
        VALUES ($1, $2, $3)
        RETURNING *`,
        [name, price, image]
    );
        res.status(201).json({success: true, data: result.rows[0]});

    } catch (error) { 
        console.error("Error in Create Product", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
    
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const {name, price, image} = req.body;

    try {
        const result = await pool.query(
           `UPDATE product 
            SET 
            name = COALESCE($1, name),
            price = COALESCE($2, price),
            image = COALESCE($3, image),
            updated_at = CURRENT_TIMESTAMP
            WHERE id = $4
            RETURNING *`,
            [name, price, image, id]
        );

        if(result.rowCount === 0){
            return res.status(404).json({success: false, message: "Invalid Product Id"});
        }

        res.status(200).json({success: true, data: result.rows[0]});

    } catch (error) {
        console.error(error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            'DELETE FROM product WHERE id = $1',
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Invalid Product Id"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {
        console.error("Error deleting product:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}