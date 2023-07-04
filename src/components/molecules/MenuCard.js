import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import {
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import argonTheme from '../../constants/Theme';
import { renderIcon } from '../../constants/utils';

class MenuCard extends React.Component {
    render() {
        const {
            navigation,
            item,
            horizontal,
            style,
            ctaColor,
            ctaRight,
        } = this.props;
        // const imageStyles = [
        //     full ? styles.fullImage : styles.horizontalImage,
        //     imageStyle,
        // ];
        const cardContainer = [styles.card, styles.shadow, style];
        const imgContainer = [
            styles.imageContainer,
            horizontal ? styles.horizontalStyles : styles.verticalStyles,
            styles.shadow,
        ];

        return (
            <Block row={horizontal} card flex style={cardContainer}>
                <TouchableWithoutFeedback
                    onPress={() => navigation.navigate(item.cta, { selectedService: item })}
                >
                    <Block flex style={imgContainer}>
                        {renderIcon(item.cta)}
                    </Block>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                    onPress={() => navigation.navigate(item.cta, { selectedService: item })}
                >
                    <Block flex space="between" style={styles.cardDescription}>
                        <Block right={ctaRight ? true : false}>
                            <Text
                                style={{ textAlign: 'center' }}//fontFamily: 'open-sans-regular',
                                size={12}
                                muted={!ctaColor}
                                color={ctaColor || argonTheme.COLORS.TEXT_GREY}
                            >
                                {item.title}
                            </Text>
                        </Block>
                    </Block>
                </TouchableWithoutFeedback>
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        borderWidth: 2,
        minHeight: 114,
        marginBottom: 6,
    },
    cardDescription: {
        padding: theme.SIZES.BASE / 2,
        backgroundColor: '#FAFAFA',
    },
    imageContainer: {
        borderRadius: 3,
        elevation: 1,
        padding: 25,
        backgroundColor: theme.COLORS.WHITE,
    },
    image: {
        // borderRadius: 3,

    },
    horizontalImage: {
        height: 110,
        width: 'auto',

    },
    horizontalStyles: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
    verticalStyles: {
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
    },
    fullImage: {
        height: 215,
    },
    shadow: {
        shadowColor: '#8898AA',
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 6,
        shadowOpacity: 0.1,
        elevation: 2,

    },
});

export default withNavigation(MenuCard);
