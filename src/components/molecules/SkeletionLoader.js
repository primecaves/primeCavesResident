import React, { Component } from 'react';
import { Center, HStack, Skeleton, VStack } from 'native-base';

export default class SkeletionLoader extends Component {
    render() {
        return (
            <Center style={{ paddingBottom: 10, paddingTop: 20 }} h="35%" w="100%">
                <HStack
                    w="90%"
                    maxW="400"
                    borderWidth="1"
                    space={8}
                    rounded="md"
                    _dark={{
                        borderColor: 'coolGray.200',
                    }}
                    _light={{
                        borderColor: 'coolGray.200',
                    }}
                    p="4"
                >
                    <Skeleton flex="2" h="100%" w="100%" rounded="md" />
                    <VStack flex="3" space="4">
                        <HStack space="2" alignItems="center">
                            <Skeleton size="5" rounded="full" />
                            <Skeleton h="3" flex="2" rounded="full" />
                            <Skeleton h="3" flex="1" rounded="full" startColor="indigo.300" />
                        </HStack>
                        <Skeleton startColor="amber.300" />
                        <Skeleton.Text />

                    </VStack>
                </HStack>
            </Center>
        );
    }
}
