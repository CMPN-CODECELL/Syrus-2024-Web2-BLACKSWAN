
const event = require("../models/Event.model");


const getevent = async (req, res) => {
    try {
        const events = await event.find();
        res.json({events});
          
    } catch (error) {
        
        console.error(error);
        res.status(500).json({ error:error.message });
    }
}
const applyforevent = async (req, res) => {
    const userId = req.userId;
    const eventId = req.params.eventId; 
    try {
        const foundEvent = await event.findById(eventId); 
        if (!foundEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }

        
        if (!foundEvent.participants) {
            foundEvent.participants = [];
        }

        foundEvent.participants.push(userId);
        await foundEvent.save();

        res.status(200).json({ message: 'Successfully applied for the event' });
    } catch (error) {
        console.error('Error applying for event:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}



module.exports = {getevent,applyforevent};