import React, { Component } from 'react';
import { Center, HStack, Skeleton, VStack } from 'native-base';

class SkeletionLoader extends Component {
  render() {
    const { noticeCard, button, clubhouse } = this.props;
    if (!noticeCard) {
      return (
        <Center w="100%" h="34%">
          <HStack
            w="90%"
            maxW="400"
            h="80%"
            borderWidth="1"
            space={5}
            rounded="md"
            _dark={{
              borderColor: 'coolGray.500',
            }}
            _light={{
              borderColor: 'coolGray.200',
            }}
            p="4"
          >
            <VStack w="100%">
              <HStack space={5}>
                <Skeleton
                  flex="1"
                  h="41"
                  rounded="md"
                  startColor="emerald.500"
                />
                <VStack flex="3" space="4">
                  <Skeleton
                    w="200"
                    h="30"
                    startColor="amber.300"
                    marginBottom={8}
                  />
                </VStack>
              </HStack>
              <HStack space="5" marginBottom={8}>
                <Skeleton
                  h="3"
                  flex="1"
                  rounded="md"
                  startColor="coolGray.300"
                />
                <Skeleton
                  h="3"
                  flex="1"
                  rounded="md"
                  startColor="coolGray.300"
                />
                <Skeleton
                  h="3"
                  flex="1"
                  rounded="md"
                  startColor="coolGray.300"
                />
              </HStack>
              {clubhouse && (
                <HStack space="5" marginBottom={8}>
                  <Skeleton
                    h="5"
                    flex="1"
                    rounded="md"
                    startColor="coolGray.300"
                  />
                  <Skeleton h="5" flex="1" startColor="coolGray.300" />
                </HStack>
              )}
              <HStack flex="2" space="5">
                {button && (
                  <Skeleton rounded="md" startColor="primary.100" flex={1} />
                )}
                <Skeleton rounded="md" startColor="amber.300" flex={1} />
              </HStack>
            </VStack>
          </HStack>
        </Center>
      );
    } else {
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
                <Skeleton
                  h="3"
                  flex="1"
                  rounded="full"
                  startColor="indigo.300"
                />
              </HStack>
              <Skeleton startColor="amber.300" />
              <Skeleton.Text />
            </VStack>
          </HStack>
        </Center>
      );
    }
  }
}

export default SkeletionLoader;
