import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/comments';

function CommentsForm({ refreshComments }) {
    const [formData, setFormData] = useState({
        username: '',
        remarks: '',
        rating: 5
    });

    // Handle input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: name === 'rating' ? Number(value) : value
        });
    };

    // Handle form submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            //  CONNECTING TO BACKEND
            const response = await axios.post(API_URL, formData);
            console.log('✅ Comment saved:', response.data);
            
            // Reset form
            setFormData({
                username: '',
                remarks: '',
                rating: 5
            });
            
            // Refresh comments list
            refreshComments();
            
            alert('Comment added successfully!');
        } catch (error) {
            console.error('❌ Error:', error);
            alert('Failed to add comment');
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>💬 Give a Comment!</h2>
            
            <form onSubmit={handleSubmit} style={styles.form}>
                {/* Username */}
                <div style={styles.formGroup}>
                    <label htmlFor="username" style={styles.label}>
                        Username:
                    </label>
                    <input
                        placeholder="Enter your name"
                        type="text"
                        value={formData.username}
                        onChange={handleInputChange}
                        id="username"
                        name="username"
                        required
                        style={styles.input}
                    />
                </div>

                {/* Remarks */}
                <div style={styles.formGroup}>
                    <label htmlFor="remarks" style={styles.label}>
                        Remarks:
                    </label>
                    <textarea
                        value={formData.remarks}
                        placeholder="Add your comments here..."
                        onChange={handleInputChange}
                        id="remarks"
                        name="remarks"
                        required
                        style={styles.textarea}
                        rows="4"
                    />
                </div>

                {/* Rating */}
                <div style={styles.formGroup}>
                    <label htmlFor="rating" style={styles.label}>
                        Rating (1-5):
                    </label>
                    <input
                        placeholder="Rating"
                        type="number"
                        min="1"
                        max="5"
                        value={formData.rating}
                        onChange={handleInputChange}
                        id="rating"
                        name="rating"
                        required
                        style={styles.input}
                    />
                    <div style={styles.ratingDisplay}>
                        {Array.from({ length: 5 }, (_, i) => (
                            <span key={i} style={{
                                color: i < formData.rating ? '#FFD700' : '#ccc',
                                fontSize: '24px'
                            }}>
                                ★
                            </span>
                        ))}
                    </div>
                </div>

                <button type="submit" style={styles.button}>
                    📝 Add Comment
                </button>
            </form>
        </div>
    );
}

// Styles
const styles = {
    container: {
        maxWidth: '500px',
        margin: '30px auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '10px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    title: {
        textAlign: 'center',
        color: '#333',
        marginBottom: '20px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column'
    },
    label: {
        marginBottom: '5px',
        fontWeight: 'bold',
        color: '#555'
    },
    input: {
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '16px'
    },
    textarea: {
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '16px',
        resize: 'vertical'
    },
    ratingDisplay: {
        marginTop: '5px'
    },
    button: {
        padding: '12px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s'
    }
};

export default CommentsForm;