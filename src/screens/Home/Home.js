import React from "react";
import { StyleSheet, Dimensions, ScrollView, ActivityIndicator, View } from "react-native";
import { Block, theme, Text } from "galio-framework";
import { MenuCard } from "../../components";
import menu from "../../constants/menu";
import _map from 'lodash/map'
import _get from 'lodash/get'
import argonTheme from "../../constants/Theme";
const { width } = Dimensions.get("screen");

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            menu: []
        }
    }
    fetchMenuDetails = () => {
        // this.setState({ isLoading: true })
        // fetchMenuDetailService().then(response => {
        //     if (response) {
        //         const { data } = response;
        //         this.setState({
        //             isLoading: false,
        //             menu: _get(data, 'data', []),
        //         })
        //     }
        // }).catch(() => {
        //     this.setState({ isLoading: false })
        // });
        this.setState({
            isLoading: false,
            menu,
        })
    }
    componentDidMount() {
        this.fetchMenuDetails()
    }

    renderMenus = () => {
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.menu}
            >
                <Block flex>
                    <Block flex row>
                        <MenuCard
                            item={menu[0]}
                            style={{ marginRight: theme.SIZES.BASE }}
                        />
                        <MenuCard item={menu[1]} />
                    </Block>
                    <Block flex row>
                        <MenuCard
                            item={menu[2]}
                            style={{ marginRight: theme.SIZES.BASE }}
                        />
                        <MenuCard item={menu[3]} />
                    </Block>
                    <Block flex row>
                        <MenuCard
                            item={menu[4]}
                            style={{ marginRight: theme.SIZES.BASE }}
                        />
                        <MenuCard item={menu[5]} />
                    </Block>
                </Block>
            </ScrollView>
        );
    };

    render() {
        const { isLoading, } = this.state
        if (isLoading) {
            return (
                <View >
                    <ActivityIndicator size="large"
                        color={argonTheme.COLORS.PRIMARY} />
                </View>
            );
        }
        return (
            <Block flex center style={styles.home}>
                {this.renderMenus()}
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    home: {
        width: width
    },
    menu: {
        width: width - theme.SIZES.BASE * 3,
        paddingVertical: theme.SIZES.BASE,
        paddingHorizontal: 2
    }
});

export default Home;
