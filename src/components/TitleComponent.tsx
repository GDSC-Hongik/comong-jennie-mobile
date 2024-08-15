import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface TitleComponentProps {
    title: string;
}

const TitleComponent: React.FC<TitleComponentProps> = ({ title }) => {
    const [isRead, setIsRead] = useState(false);


    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 15,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 25,
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: 'left',
        color: '#050360',
        fontWeight: 'bold',
    },
});

export default TitleComponent;
