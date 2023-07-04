import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, RefreshControl } from 'react-native';
import { Block, Text } from 'galio-framework';
import { DynamicKeyCard, EmptyComponent, Form, Header, Modal } from '../../components';
import { Button } from '../../components';
import { addExpectedVisitor, deleteExpectedVisitor, fetchExpectedVisitors, updateExpectedVisitor } from './addExpectedVisitor.services';
import { getKeyValuePair } from '../../utils';
import { showMessage } from 'react-native-flash-message';
import { FIELDS } from './addExpectedVisitor.constants';
import argonTheme from '../../constants/Theme';
import _map from 'lodash/map';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import { EMPTY_OBJECT, EMPTY_STRING } from '../../constants';
import AlertModal from '../../components/molecules/AlertModal';
class AddExpectedVisitors extends Component {
    state = {
        isLoading: false,
        isAlertModalVisible: false,
        visitors: [],
        isFormModalVisible: false,
        initialValues: EMPTY_OBJECT,
    };

    componentDidMount() {
        this.fetchVisitors();
    }

    fetchVisitors = () => {
        const { userInfo } = this.props;
        const request = {
            is_expected_visitor: true,
            resident_id: _get(userInfo, '_id', EMPTY_STRING),
        };
        this.setState({ isLoading: true });
        fetchExpectedVisitors(request)
            .then(response => {
                if (response) {
                    const { data, key_to_remove, display_name_key } = response.data;
                    this.setState({
                        isLoading: false,
                        visitors: data,
                        keyToRemove: key_to_remove,
                        displayNameKey: display_name_key,
                    });
                }
            })
            .catch(() => {
                this.setState({ isLoading: false });
            });
    };

    toggleFormModal = (initialValues = EMPTY_OBJECT) => {
        this.setState(prevState => ({
            isFormModalVisible: !prevState.isFormModalVisible,
            initialValues,
        }));
    };

    handleDeleteExpectedVisitor = () => {
        const { initialValues } = this.state;
        this.setState({ isLoading: true });
        deleteExpectedVisitor(_get(initialValues, '_id'))
            .then(response => {
                if (response) {
                    this.setState({
                        isLoading: false,
                        isFormModalVisible: false,
                        initialValues: EMPTY_OBJECT,
                    });
                    showMessage({
                        message: 'Expected Visitor Deletion Successfully',
                        type: 'success',
                        backgroundColor: argonTheme.COLORS.SUCCESS,
                    });
                    this.fetchVisitors();
                }
            })
            .catch(() => {
                this.setState({
                    isLoading: false,
                    isFormModalVisible: false,
                });
                showMessage({
                    message: 'Failed to Delete Expected Visitor',
                    type: 'error',
                    backgroundColor: argonTheme.COLORS.WARNING,
                });
            });
    };

    toggleAlertModal = (initialValues = EMPTY_OBJECT) => {
        this.setState(prevState => ({
            isAlertModalVisible: !prevState.isAlertModalVisible,
            initialValues,
        }));
    };

    handleSubmit = values => {
        const { userInfo } = this.props;
        const { initialValues } = this.state;
        this.setState({ isLoading: true });
        const request = {
            is_expected_visitor: true,
            name: _get(values, 'name', EMPTY_STRING),
            phone_number: _get(values, 'phone_number', EMPTY_STRING),
            purpose_of_visit: _get(values, 'description', EMPTY_STRING),
            visitor_type: _get(values, 'visitor_type', 'Guest'),
            expected_date: _get(values, 'expected_date', new Date()),
            block: _get(userInfo, 'block', EMPTY_STRING),
            flat_number: _get(userInfo, 'flat_number', EMPTY_STRING),
            floor_number: _get(userInfo, 'floor_number', EMPTY_STRING),
            resident_id: _get(userInfo, '_id', EMPTY_STRING),
            status: 'waiting',
        };

        // Perform the necessary API request to add the expected visitor
        //const handler = _isEmpty(initialValues) ? addExpectedVisitor : updateExpectedVisitor;
        addExpectedVisitor(request)
            .then(response => {
                if (response) {
                    this.setState({
                        isLoading: false,
                        isFormModalVisible: false,
                        initialValues: EMPTY_OBJECT,
                    });
                    showMessage({
                        message: 'Expected Visitor Added Successfully',
                        type: 'success',
                        backgroundColor: argonTheme.COLORS.SUCCESS,
                    });
                    this.fetchVisitors();
                }
            })
            .catch(() => {
                this.setState({
                    isLoading: false,
                    isFormModalVisible: false,
                });
                showMessage({
                    message: 'Failed to Add Expected Visitor',
                    type: 'error',
                    backgroundColor: argonTheme.COLORS.WARNING,
                });
            });
    };

    renderFooter = item => {
        const { isAlertModalVisible } = this.state;
        return (
            <>
                <View style={styles.horizontalLine} />
                <Block flex row>
                    <AlertModal
                        visible={isAlertModalVisible}
                        onClose={this.toggleAlertModal}
                        onSubmit={this.handleDeleteExpectedVisitor}
                    />
                    <Button
                        shadowless
                        style={styles.secondaryButton}
                        onPress={() => this.toggleAlertModal(item)}
                    >
                        <Block row>
                            <Text size={14}>Remove</Text>
                        </Block>
                    </Button>
                    <View style={styles.verticleLine} />
                    <Button
                        shadowless
                        style={styles.primaryButton}
                        onPress={() => this.toggleFormModal(item)}
                    >
                        <Block row>
                            <Text style={styles.text} size={15}>
                                Edit
                            </Text>
                        </Block>
                    </Button>
                </Block>
            </>
        );
    };

    renderForm = () => {
        const { initialValues } = this.state;
        return (
            <Form
                isEdit
                initialValues={initialValues}
                fields={FIELDS}
                primaryButtonText={_isEmpty(initialValues) ? 'Add Visitor' : 'Update Visitor'}
                secondaryButtonText="Close"
                onClose={this.toggleFormModal}
                onSubmit={this.handleSubmit}
                primaryButtonProps={{
                    style: styles.footerPrimaryButton,
                }}
                secondaryButtonProps={{
                    style: styles.footerSecondaryButton,
                }}
            />
        );
    };

    render() {
        const { visitors, isLoading, isFormModalVisible, keyToRemove, displayNameKey } = this.state;
        const { navigation, scene, userInfo } = this.props;
        return (
            <Block>
                <Modal visible={isFormModalVisible} content={this.renderForm} />
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={isLoading}
                            onRefresh={this.fetchVisitors}
                        />
                    }
                >
                    <Header
                        showNavbar={false}
                        title="Add Expected Visitors"
                        back
                        search
                        navigation={navigation}
                        scene={scene}
                        showAdd
                        onAddButtonClick={this.toggleFormModal}
                        searchParams={{
                            url: 'getExpectedVisitors',
                            request: {
                                resident_id: _get(userInfo, 'resident_id'),
                                is_expected_visitor: true,
                                expected_date: new Date().toJSON(),
                            },
                        }}
                    />
                    {!_isEmpty(visitors) ? (
                        _map(visitors, (visitor, index) => (
                            <DynamicKeyCard
                                key={index}
                                isLoading={isLoading}
                                item={visitor}
                                values={getKeyValuePair(visitor)}
                                displayNameKey={displayNameKey}
                                image={_get(visitor, 'image', '')}
                                keyToRemove={keyToRemove}
                                footer={(item) => this.renderFooter(item)}
                                onEditClick={(value) => this.toggleFormModal(value)}
                            />
                        ))
                    ) : (
                        <EmptyComponent />
                    )}
                </ScrollView>
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    horizontalLine: {
        borderBottomColor: argonTheme.COLORS.BLACK,
        borderBottomWidth: 0.5,
        paddingTop: 13,
    },
    button: {
        borderColor: argonTheme.COLORS.WHITE,
        borderWidth: 1,
        height: 35,
        width: '96%',
        backgroundColor: argonTheme.COLORS.PRIMARY,
        borderRadius: 6,
    },
    text: {
        fontFamily: 'open-sans-regular',
        backgroundColor: argonTheme.COLORS.PRIMARY,
        alignItems: 'center',
        color: argonTheme.COLORS.WHITE,
    },
    footerPrimaryButton: {
        height: 25,
        fontColor: argonTheme.COLORS.WHITE,
        backgroundColor: argonTheme.COLORS.PRIMARY,
    },
    footerSecondaryButton: {
        height: 25,
        fontColor: argonTheme.COLORS.BLACK,
        backgroundColor: argonTheme.COLORS.WHITE,
    },
    footerButton: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        paddingHorizontal: 20,
        borderRadius: 30,
        backgroundColor: argonTheme.COLORS.PRIMARY,
    },
    footerButtonText: {
        color: argonTheme.COLORS.WHITE,
        fontSize: 14,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    secondaryButton: {
        borderColor: argonTheme.COLORS.BLACK,
        borderWidth: 1,
        height: 25,
        width: '36%',
        borderRadius: 5,
        backgroundColor: argonTheme.COLORS.WHITE,
        marginRight: 26,
    },
    primaryButton: {
        borderColor: argonTheme.COLORS.WHITE,
        borderWidth: 1,
        height: 26,
        width: '43%',
        borderRadius: 5,
        backgroundColor: argonTheme.COLORS.PRIMARY,
        fontColor: argonTheme.COLORS.WHITE,
    },
});

export default AddExpectedVisitors;
