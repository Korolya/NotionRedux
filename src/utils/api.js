export default class Api {
    static async getUser({ email, password }) {
        const query = new URLSearchParams({
            email,
            password,
        }).toString();
        try {
            const response = await fetch(`http://localhost:5001/users?${query}`);
            const users = await response.json();
            const user = users[0];

            if (user) {
                return user;
            } else {
                throw new Error("Invalid user");
            }
        } catch (error) {
            throw error.message;
        }
    }

    static async getNotes({ userId, q }) {
        try {
            const query = new URLSearchParams({
                userId,
                q
            }).toString();
            const response = await fetch(`http://localhost:5001/notes?${query}&_sort=createdAt&_order=desc`);
            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }

    static async deleteNote(noteId) {
        try {
            const response = await fetch(`http://localhost:5001/notes/${noteId}`, {
                method: "DELETE",
            });
            if (response.ok) {
                return true;
            } else {
                throw error
            }
        } catch (error) {
            throw error
        }
    }

    static async addNote(newNote) {
        try {
            const response = await fetch("http://localhost:5001/notes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newNote),
            })
            if (!response.ok) throw new Error("error delete")
            const data = await response.json();
            return data
        } catch (error) {
            throw error

        }
    }

    static async editNote(editedNote, id) {
        try {
            const response = await fetch(`http://localhost:5001/notes/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editedNote),
            })
            const data = await response.json();
            return data;
        } catch (error) {
            throw error
        }
    }
}