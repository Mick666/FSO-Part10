import React from 'react';
import { TextInput, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const RepositorySorter = ({ setOrdering, setDirection }) => {

    const onChange = (values) => {
        const valArray = values.split(',');
        setOrdering(valArray[0]);
        setDirection(valArray[1]);
    };

    return (
        <RNPickerSelect
            onValueChange={(value) => onChange(value)}
            items={[
                { label: 'Latest repositories', value: 'CREATED_AT, DESC' },
                { label: 'Highest rated repositories', value: 'RATING_AVERAGE, DESC' },
                { label: 'Lowest rated repositories', value: 'RATING_AVERAGE, ASC' },
            ]}
            value={'CREATED_AT, DESC'}
        />
    );
};

const RepositorySearcher = ({ setSearchTerm }) => {
    return (
        <TextInput
        defaultValue={''}
        onChange={(e) => setSearchTerm(e.target.value)}
        />
    );

};

const RepositorySorters = ({ setSearchTerm, setOrdering, setDirection }) => {
    return (
        <View>
            <RepositorySearcher setSearchTerm={setSearchTerm}/>
            <RepositorySorter setOrdering={setOrdering} setDirection={setDirection} />
        </View>
    );
};

export default RepositorySorters;