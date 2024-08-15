import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface NotificationBoxProps {
    title: string;
    detail: string;
}

const NotificationBox: React.FC<NotificationBoxProps> = ({ title, detail }) => {
    const [isRead, setIsRead] = useState(false);

    const handlePress = () => {
        setIsRead(true);
    };

    return (
        <TouchableOpacity onPress={handlePress} style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.detail}>{detail}</Text>
            </View>
            <View style={[styles.indicator, isRead && styles.indicatorRead]} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 10,
        //paddingLeft: 20,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    detail: {
        fontSize: 14,
        color: '#555',
    },
    indicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#0080DC', // Blue color for unread
        marginLeft: 10,
        marginBottom: 30,
    },
    indicatorRead: {
        backgroundColor: '#ccc', // Gray color for read
    },
});

export default NotificationBox;
