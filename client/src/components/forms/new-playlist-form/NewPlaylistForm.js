import React, { useState } from 'react';
import styled from 'styled-components';

import Input from '../input';
import Textarea from '../textarea';
import Button from '../../button';

const Form = styled.form`
    color: ${props => props.theme.textColor}
    text-align: left;
    font-size: 1.5rem;
    line-height: 4em;
    margin-bottom: 80px;
`;

const NewPlaylistForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    return (
        <>
            <Form onSubmit={e => e.preventDefault()}>
                <Input handleType={setName} placeholder='Enter Name of Playlist...' />

                <label>Description:
                    <Textarea handleType={setDescription} placeholder='Enter Description...' />
                </label>
            </Form>

            <Button primary>Start Editing</Button>
        </>
    );
};

export default NewPlaylistForm;