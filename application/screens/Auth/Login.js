import React from 'react';
import ROW from "../../components/shared/ROW";
import {Controller, useForm} from "react-hook-form";
import {scale} from "react-native-size-matters";
import SubText from "../../components/shared/SubText";
import {Image, StyleSheet, TextInput} from "react-native";
import CustomButton from "../../components/shared/CustomButton";
import TitleText from "../../components/shared/TitleText";
import {useMutation} from "react-query";
import {LoginApi} from "../../services/Api/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useToast} from "react-native-toast-notifications";
import { profileApi, profileApi2 } from '../../services/Api/profile';
import userStore from '../../store/user.store';

const Login = () => {
    const {isLoading, mutateAsync} = useMutation((data) => LoginApi(data))
    const {isLoading2, mutateAsync:getProfileAsync} = useMutation((data) => profileApi(data))

    const toast = useToast();

    const {control, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            username: 'moinayazifar',
            password: 'MoinAli123',
        }
    })
    const onSubmit = async info => {
        var data = JSON.stringify({
            userName: info.username,
            password: info.password
        });
        try {
            const res = await mutateAsync(data)
            if (res.status === 201) {
                toast.show('welcome to TennisLand', {type: 'success_type',});
                await AsyncStorage.setItem('token', res.data.idToken.jwtToken)
                console.log('logged now get profile')
             
                const user = await getProfileAsync(res.data.idToken.jwtToken);
                console.log('profile fetched')
                await AsyncStorage.setItem('user', JSON.stringify(user.data))
                userStore.getUser();
                console.log(userStore.user)
                
            }
                
            
        } catch (e) {
            toast.show(e.response.data.message, {type: 'error_type',});

        }
    }
    return (
        <ROW p={scale(10)} flex={1} justifycenter bg={'#fff'}>

            <ROW aligncenter justifycenter mb={scale(50)}>
                <TitleText>Welcome to</TitleText>
                <TitleText size={scale(25)}>TennisLand</TitleText>
            </ROW>
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                    <ROW mb={scale(20)}>

                        <TitleText>Username</TitleText>
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                        {errors.username && <SubText style={styles.error} title='This is required.'/>}

                    </ROW>
                )}
                name="username"
            />
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                    <ROW mb={scale(20)}>
                        <TitleText>Password</TitleText>
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                        {errors.password && <SubText style={styles.error} title='This is required.'/>}

                    </ROW>
                )}
                name="password"
            />
            <CustomButton title={isLoading ? 'Loading ...' : 'Submit'} disabled={isLoading}
                          onPress={handleSubmit(onSubmit)}/>
        </ROW>
    )
};

export default Login;
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
