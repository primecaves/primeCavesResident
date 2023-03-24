import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'

export default class Menu extends Component {
    render() {
        const { navigation } = this.props
        return (
            <View>
                <Text>Menu Component</Text>
                <Button
                    onPress={() => navigation.push("Home")}
                    title="Learn More"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />
            </View>
        )
    }
}
