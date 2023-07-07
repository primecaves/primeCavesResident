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
import _filter from 'lodash/filter';
import _includes from 'lodash/includes';
import { EMPTY_OBJECT, EMPTY_STRING } from '../../constants';
import AlertModal from '../../components/molecules/AlertModal';


class AddExpectedVisitors extends Component {
    state = {
        isLoading: false,
        isAlertModalVisible: false,
        visitors: [],
        isFormModalVisible: false,
        initialValues: EMPTY_OBJECT,
        isEdit: false,
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
                    const keyToRemove = [..._filter(key_to_remove, item => !_includes(['block', 'flat_number', 'floor_number', 'additional_visitors', 'visitor_type'], item)), 'images', 'description'];
                    this.setState({
                        isLoading: false,
                        visitors: data,
                        keyToRemove,
                        displayNameKey: display_name_key,
                    });
                }
            })
            .catch(() => {
                this.setState({ isLoading: false });
            });
    };

    toggleFormModal = (initialValues = EMPTY_OBJECT, isEdit = false) => {

        this.setState(prevState => ({
            isFormModalVisible: !prevState.isFormModalVisible,
            initialValues,
            isEdit,
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
                        isAlertModalVisible: false,
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
                    isAlertModalVisible: false,
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
                        onPress={() => this.toggleFormModal(item, true)}
                    >
                        <Block row>
                            <Text style={styles.text} size={15}>
                                Update
                            </Text>
                        </Block>
                    </Button>
                </Block>
            </>
        );
    };

    renderForm = () => {
        const { initialValues, isLoading, isEdit } = this.state;
        return (
            <Form
                isEdit={isEdit}
                fields={FIELDS}
                initialValues={initialValues}
                primaryButtonText={isEdit ? 'Update Visitor' : 'Add Visitor'}
                secondaryButtonText="Close"
                onClose={this.toggleFormModal}
                onSubmit={this.handleSubmit}
                primaryButtonProps={{
                    style: styles.footerPrimaryButton,
                }}
                secondaryButtonProps={{
                    style: styles.footerSecondaryButton,
                }}
                isPrimaryLoading={isLoading}
            />
        );
    };

    handleSubmit = values => {
        const { userInfo } = this.props;
        const { isEdit } = this.state;
        this.setState({ isLoading: true });
        const request = {
            is_expected_visitor: true,
            name: _get(values, 'name', EMPTY_STRING),
            phone_number: _get(values, 'phone_number', EMPTY_STRING),
            purpose_of_visit: _get(values, 'description', EMPTY_STRING),
            description: _get(values, 'description', EMPTY_STRING),
            visitor_type: _get(values, 'visitor_type', 'Guest'),
            expected_date: _get(values, 'expected_date', new Date()),
            block: _get(userInfo, 'block', EMPTY_STRING),
            flat_number: _get(userInfo, 'flat_number', EMPTY_STRING),
            floor_number: _get(userInfo, 'floor_number', EMPTY_STRING),
            resident_id: _get(userInfo, '_id', EMPTY_STRING),
            status: 'waiting',
        };
        const handler = isEdit ? updateExpectedVisitor(_get(values, '_id'), request) : addExpectedVisitor(request);
        handler.then(response => {
            if (response) {
                this.setState({
                    isLoading: false,
                    isFormModalVisible: false,
                    initialValues: EMPTY_OBJECT,
                    isEdit: false,
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
                    isEdit: false,
                });
                showMessage({
                    message: 'Failed to Add Expected Visitor',
                    type: 'error',
                    backgroundColor: argonTheme.COLORS.WARNING,
                });
            });
    };

    render() {
        const { visitors, isLoading, isFormModalVisible, keyToRemove, displayNameKey } = this.state;
        const { navigation, scene, userInfo } = this.props;
        return (
            <Block>
                <Modal
                    visible={isFormModalVisible}
                    content={this.renderForm} />
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={isLoading}
                            onRefresh={this.fetchVisitors}
                        />
                    }
                >
                    <Header
                        title="Add Expected Visitors"
                        back
                        search
                        navigation={navigation}
                        scene={scene}
                        showAdd
                        onAddButtonClick={this.toggleFormModal}
                        searchParams={{
                            url: 'getAllVisitors',
                            request: {
                                resident_id: _get(userInfo, '_id'),
                                is_expected_visitor: true,
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
