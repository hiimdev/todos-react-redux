import {useSelector, useDispatch} from 'react-redux';
import {addUser, deleteUser, updateUsername} from '../features/userSlice';
import {useState} from 'react';
import {v4 as uuidv4} from 'uuid';

import '../App.css';

function User() {
    const dispatch = useDispatch();
    const userList = useSelector((state) => state.users.value);

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [newUsername, setNewUsername] = useState('');

    const handleAddUser = () => {
        if (email === '') {
            return;
        }

        if (username === '') {
            return;
        }
        dispatch(
            addUser({
                id: uuidv4(),
                email,
                username,
            }),
        );

        setEmail('');
        setUsername('');
    };

    const handleUpdateUsername = (user) => {
        if (newUsername === '') return;

        dispatch(
            updateUsername({
                id: user.id,
                username: newUsername,
            }),
        );

        setNewUsername('');
    };

    const handleDeleteUser = (user) => {
        dispatch(deleteUser({id: user.id}));
    };

    return (
        <div className='container__user'>
            <div className='add__user'>
                <input
                    type='email'
                    placeholder='Email...'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <input
                    type='text'
                    placeholder='Username...'
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
                <button onClick={handleAddUser}>Add User</button>
            </div>

            <div className='display__user'>
                <div className='container'>
                    {userList.length === 0 && (
                        <h3 className='text__nothing'>Nothing here!!</h3>
                    )}

                    {userList.length !== 0 &&
                        userList.map((user) => {
                            return (
                                <div className='wrapper' key={user.id}>
                                    <h1>Email: {user.email}</h1>
                                    <h1>Username: {user.username}</h1>
                                    <div className='update__username'>
                                        <input
                                            type='text'
                                            placeholder='New Username...'
                                            onChange={(e) =>
                                                setNewUsername(e.target.value)
                                            }
                                            // value={newUsername}
                                        />
                                        <button
                                            onClick={() =>
                                                handleUpdateUsername(user)
                                            }
                                        >
                                            Update Username
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDeleteUser(user)
                                            }
                                        >
                                            Delete User
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

export default User;
