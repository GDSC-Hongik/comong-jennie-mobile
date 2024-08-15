import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface NotificationBox2Props {
    title: string;
    detail: string;
}

const NotificationBox2: React.FC<NotificationBox2Props> = ({ title, detail }) => {
    const [isRead, setIsRead] = useState(false);

    const handlePress = () => {
        setIsRead(true);
    };

    return (
        <TouchableOpacity onPress={handlePress} style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.detail}>{title}</Text>
                <Text style={styles.title}>{detail}</Text>
            </View>
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
        
    },
    detail: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
    },
    indicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#ccc', // Blue color for unread
        marginLeft: 10,
        marginBottom: 30,
    },
    indicatorRead: {
        backgroundColor: '#ccc', // Gray color for read
    },
});

export default NotificationBox2;
