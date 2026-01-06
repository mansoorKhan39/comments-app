import { useState, useEffect } from 'react';
import axios from 'axios';
import CommentsForm from './CommentsForm';

const API_URL = 'http://localhost:5000/api/comments';

function App() {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    //  FETCH COMMENTS FROM BACKEND
    const fetchComments = async () => {
        try {
            setLoading(true);
            const response = await axios.get(API_URL);
            setComments(response.data);
        } catch (error) {
            console.error('❌ Error fetching comments:', error);
        } finally {
            setLoading(false);
        }
    };

    //  DELETE COMMENT
    const deleteComment = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchComments(); // Refresh list
            alert('Comment deleted!');
        } catch (error) {
            console.error('❌ Error deleting comment:', error);
        }
    };

    // Load comments at start
    useEffect(() => {
        fetchComments();
    }, []);

    return (
        <div style={styles.app}>
            <header style={styles.header}>
                <h1>💬 MERN Comments App</h1>
            </header>

            <main style={styles.main}>
                {/* Comments Form */}
                <CommentsForm refreshComments={fetchComments} />

                {/* Comments List */}
                <div style={styles.commentsSection}>
                    <h2 style={styles.sectionTitle}>
                        📋 Comments ({comments.length})
                    </h2>
                    
                    {loading ? (
                        <p style={styles.loading}>Loading comments...</p>
                    ) : comments.length === 0 ? (
                        <p style={styles.noComments}>No comments yet. Be the first!</p>
                    ) : (
                        <div style={styles.commentsList}>
                            {comments.map((comment) => (
                                <div key={comment._id} style={styles.commentCard}>
                                    <div style={styles.commentHeader}>
                                        <span style={styles.username}>
                                            👤 {comment.username}
                                        </span>
                                        <span style={styles.rating}>
                                            {Array.from({ length: 5 }, (_, i) => (
                                                <span key={i} style={{
                                                    color: i < comment.rating ? '#FFD700' : '#ccc'
                                                }}>
                                                    ★
                                                </span>
                                            ))}
                                        </span>
                                        <button 
                                            onClick={() => deleteComment(comment._id)}
                                            style={styles.deleteButton}
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                    <p style={styles.remarks}>{comment.remarks}</p>
                                    <small style={styles.date}>
                                        {new Date(comment.createdAt).toLocaleDateString()}
                                    </small>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

           
        </div>
    );
}

// Styles
const styles = {
    app: {
        fontFamily: 'Arial, sans-serif',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px'
    },
    header: {
        textAlign: 'center',
        marginBottom: '30px'
    },
    main: {
        marginBottom: '40px'
    },
    commentsSection: {
        marginTop: '40px'
    },
    sectionTitle: {
        borderBottom: '2px solid #4CAF50',
        paddingBottom: '10px'
    },
    loading: {
        textAlign: 'center',
        color: '#666'
    },
    noComments: {
        textAlign: 'center',
        color: '#999',
        fontStyle: 'italic'
    },
    commentsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    },
    commentCard: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '15px',
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    },
    commentHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px'
    },
    username: {
        fontWeight: 'bold',
        fontSize: '18px'
    },
    rating: {
        fontSize: '20px'
    },
    deleteButton: {
        background: '#ff4444',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        padding: '5px 10px',
        cursor: 'pointer'
    },
    remarks: {
        margin: '10px 0',
        color: '#333'
    },
    date: {
        color: '#666',
        fontSize: '12px'
    },
    list: {
        lineHeight: '1.8'
    }
};

export default App;