import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';

import { SignInContainer } from '../src/components/SignIn';

jest.mock("@react-native-community/async-storage", () =>
    require("@react-native-community/async-storage/jest/async-storage-mock"),
);

describe('SignIn', () => {
    describe('SignInContainer', () => {
        it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
            const onSubmit = jest.fn();
            const { getByTestId } = render(<SignInContainer onSubmit={onSubmit} />);

            fireEvent.changeText(getByTestId('usernameField'), 'kalle');
            fireEvent.changeText(getByTestId('passwordField'), 'password');
            fireEvent.press(getByTestId('submitButton'));

            await waitFor(() => {
                expect(onSubmit.mock.calls[0][0]).toEqual({
                    username: 'kalle',
                    password: 'password',
                });
                expect(onSubmit.mock.calls.length).toEqual(1);
            }, { timeout: 500, interval: 100 });

        });
    });
});