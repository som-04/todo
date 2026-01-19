export const getAllNotes = (req, res) => {
    res.status(200).send("you just fetched the notes");
};

export const createNote = (req, res) => {
    res.status(201).json({ message: "post created successfilly!" });
};

export const updateNote = (req, res) => {
    res.status(201).json({ message: "post updated successfilly!" });
};

export const deleteNote = (req, res) => {
    res.status(201).json({ message: "post deleted successfilly!" });
};
