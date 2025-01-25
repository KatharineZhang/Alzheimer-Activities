import React, {useState} from 'react';
import {Button, Text} from 'react-native';
import { View } from 'react-native';

type catProps = {name: string};



const getFullName = (firstName: string, lastName: string) => {
    return firstName + ' ' + lastName;
}

const Cat = (props: catProps) => {
    const [isHungry, setIsHungry] = useState(true);
    return (
        <View>
            <Text>hello, I am {props.name}</Text>
            <Text>My full name is {getFullName(props.name, "Laney")}</Text>
            <Text>Am I hungry? {isHungry}</Text>
            <Button onPress={() => setIsHungry(false)} title={"feed the cat"}/>
            { !isHungry ? <Button onPress={() => setIsHungry(true)} title={"CLICK TO STARVE THE CAT"} /> : null}
        </View>
    );
};

const Home = () => {
    return (
        <View>
            <Cat name="A Poor Lil'kitten"/>
        </View>
    );
}

export default Home;

