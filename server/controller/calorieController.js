const CalorieTracker = require('../models/CalorieEntry.model');

const getTotalCalorieAmount = async (req, res) => {
    try {
        const userId = req.userId; 

        const userCalorieEntries = await CalorieTracker.find({ userId });

       
        let totalCalorieAmount = 0;
        for (const entry of userCalorieEntries) {
            totalCalorieAmount += entry.calorieAmount;
        }

        
        if (userCalorieEntries.length === 0) {
            return res.status(404).json({ error: 'No calorie entries found for the user' });
        }

        res.status(200).json({ totalCalorieAmount });
    } catch (error) {
        console.error('Error fetching total calorie amount:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const addCalorieEntry = async (req, res) => {
    try {
        const { productType, quantity } = req.body;
        const userId = req.userId; 

        
        const calorieMap = {
            "milk": 42,    
            "eggs": 78,    
            "bread": 79,   
            "chapati": 104,
            "rice": 130,   
            "curry": 150   
        };

        let totalCalories = 0;
        if (productType && quantity) {
            if (calorieMap.hasOwnProperty(productType)) {
                totalCalories = quantity * calorieMap[productType];
            } else {
                return res.status(400).json({ error: `Invalid product type: ${productType}` });
            }
        } else {
            return res.status(400).json({ error: 'Product type and quantity are required' });
        }

        
        const newEntry = await CalorieTracker.create({
            userId,
            productType,
            quantity,
            totalCalories
        });

        res.status(201).json(newEntry);
    } catch (error) {
        console.error('Error adding calorie entry:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {addCalorieEntry,
    getTotalCalorieAmount};


