import React from 'react';
import {ScrollView, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import Layout from "../../../components/shared/Layout";
import ROW from "../../../components/shared/ROW";
import {scale} from "react-native-size-matters";
import {AddCommentIcon, AddEvent, BackIcon} from "../../../components/shared/Icons";
import TitleText from "../../../components/shared/TitleText";
import Br from "../../../components/shared/Br";
import {useNavigation} from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import SubText from "../../../components/shared/SubText";
import {AddTicket} from "../../../services/AuthApi";
import {Controller, useForm} from "react-hook-form";
import CustomButton from "../../../components/shared/CustomButton";

const EditProfileScreen = () => {
    const navigation = useNavigation()
    const {control, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            name: 'mohammad',
            email: 'mohammadtaheri30133@gmail.com',
            about: 'hi my name is mohammad and ...',
        }
    })
    const onSubmit = data => console.log(data);

    return (
        <ScrollView stickyHeaderIndices={[0]} style={{backgroundColor: '#fff'}}>
            <ROW>
                <ROW ph={scale(10)} pv={scale(5)} bg='#fff'>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{padding: scale(5)}}>
                        <ROW row aligncenter>
                            <BackIcon/>
                            <TitleText style={{marginLeft: scale(10)}}>Edit Profile</TitleText>
                        </ROW>
                    </TouchableOpacity>
                </ROW>
                <Br/>
            </ROW>
            <Layout>
                <ROW aligncenter justifycente>
                    <ROW br={100} w={scale(120)} aligncenter justifycenter h={scale(120)}
                         bg={'rgba(255,255,255,0.4)'}>

                        <FastImage style={{
                            overflow: 'hidden',
                            borderWidth: 5,
                            borderColor: '#fff',
                            width: scale(100),
                            height: scale(100),
                            borderRadius: 100
                        }}
                                   source={{uri: 'https://qph.cf2.quoracdn.net/main-thumb-1278318002-200-ydzfegagslcexelzgsnplcklfkienzfr.jpeg'}}/>
                        <ROW bg={'#002a32'} p={scale(5)} br={20} style={{position: 'absolute', bottom: 0}}>
                            <AddCommentIcon width={28} height={28}/>
                        </ROW>
                    </ROW>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({field: {onChange, onBlur, value}}) => (
                            <ROW mv={scale(20)} w='100%'>
                                <TitleText>Name</TitleText>

                                <TextInput
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                                {errors.name && <SubText style={styles.error} title='This is required.'/>}

                            </ROW>
                        )}
                        name="name"


                    />
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({field: {onChange, onBlur, value}}) => (
                            <ROW mv={scale(20)} w='100%'>
                                <TitleText>Email</TitleText>
                                <TextInput
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                                {errors.email && <SubText style={styles.error} title='This is required.'/>}

                            </ROW>
                        )}
                        name="email"


                    />
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({field: {onChange, onBlur, value}}) => (
                            <ROW mv={scale(20)} w='100%'>
                                <TitleText>About me</TitleText>
                                <TextInput
                                    style={[styles.input, {height: 120, textAlignVertical: 'top',}]}
                                    numberOfLines={4}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    multiline={true}
                                />
                                {errors.about && <SubText style={styles.error} title='This is required.'/>}

                            </ROW>
                        )}
                        name="about"


                    />
                    <CustomButton title='Submit' style={{marginTop: scale(20)}} onPress={handleSubmit(onSubmit)}/>

                </ROW>

            </Layout>
        </ScrollView>
    );
};

export default EditProfileScreen;
const styles = StyleSheet.create({
    error: {
        color: '#970000'
    },
    input: {
        borderWidth: 2,
        borderRadius: 10,
        marginVertical: scale(4),
        borderColor: '#f6f6f6',
        height: scale(50),
        paddingHorizontal: scale(10),
        paddingVertical: scale(5),
        color: '#002a32'
    },
});
