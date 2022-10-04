import React from 'react';
import ROW from "../../components/shared/ROW";
import {ScrollView, StyleSheet, TextInput} from "react-native";
import Layout from "../../components/shared/Layout";
import {scale} from "react-native-size-matters";
import TitleText from "../../components/shared/TitleText";
import SubText from "../../components/shared/SubText";
import {useForm, Controller} from "react-hook-form";
import CustomButton from "../../components/shared/CustomButton";

const CreateForm1 = () => {
    const {control, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            title: '',
            location: '',
            court: '',
            type: '',
            level: '',
            age: '',
            gander: '',
            date: '',
            timeStart: '',
            timeEnd: '',
            endDate: '',
            cost: '',
            sports: '',
            desc: '',
        }
    })
    const onSubmit = data => console.log(data);

    return (
        <ScrollView>
            <Layout ph={scale(10)} pv={scale(15)}>
                <TitleText size={scale(20)}>Title Create Form</TitleText>
                <SubText title='description about form'/>

                <ROW>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({field: {onChange, onBlur, value}}) => (
                            <ROW mv={scale(20)}>
                                <SubText title='Title' size={scale(15)} color='#002a32'/>
                                <TextInput
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                                {errors.title && <SubText style={styles.error} title='This is required.'/>}

                            </ROW>
                        )}
                        name="title"


                    />

                    <Controller
                        control={control}
                        rules={{
                            required: true,

                        }}
                        render={({field: {onChange, onBlur, value}}) => (
                            <ROW>
                                <SubText title='Location' size={scale(15)} color='#002a32'/>
                                <TextInput
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                                {errors.location && <SubText style={styles.error} title='This is required.'/>}

                            </ROW>
                        )}
                        name="location"
                    />
                    <Controller
                        control={control}
                        rules={{
                            required: true,

                        }}
                        render={({field: {onChange, onBlur, value}}) => (
                            <ROW mv={scale(20)}>
                                <SubText title='Court' size={scale(15)} color='#002a32'/>
                                <TextInput
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                                {errors.court && <SubText style={styles.error} title='This is required.'/>}

                            </ROW>
                        )}
                        name="court"
                    />
                    <Controller
                        control={control}
                        rules={{
                            required: true,

                        }}
                        render={({field: {onChange, onBlur, value}}) => (
                            <ROW>
                                <SubText title='Type' size={scale(15)} color='#002a32'/>
                                <TextInput
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                                {errors.type && <SubText style={styles.error} title='This is required.'/>}

                            </ROW>
                        )}
                        name="type"
                    />
                    <Controller
                        control={control}
                        rules={{
                            required: true,

                        }}
                        render={({field: {onChange, onBlur, value}}) => (
                            <ROW mv={scale(20)}>

                            <SubText title='Level' size={scale(15)} color='#002a32'/>
                                <TextInput
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                                {errors.level && <SubText style={styles.error} title='This is required.'/>}

                            </ROW>
                        )}
                        name="level"
                    />
                    <Controller
                        control={control}
                        rules={{
                            required: true,

                        }}
                        render={({field: {onChange, onBlur, value}}) => (
                            <ROW>
                                <SubText title='Age' size={scale(15)} color='#002a32'/>
                                <TextInput
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                                {errors.age && <SubText style={styles.error} title='This is required.'/>}

                            </ROW>
                        )}
                        name="age"
                    />
                    <Controller
                        control={control}
                        rules={{
                            required: true,

                        }}
                        render={({field: {onChange, onBlur, value}}) => (
                            <ROW mv={scale(20)}>

                            <SubText title='Gander' size={scale(15)} color='#002a32'/>
                                <TextInput
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                                {errors.gander && <SubText style={styles.error} title='This is required.'/>}

                            </ROW>
                        )}
                        name="gander"
                    />
                    <Controller
                        control={control}
                        rules={{
                            required: true,

                        }}
                        render={({field: {onChange, onBlur, value}}) => (
                            <ROW>
                                <SubText title='Date' size={scale(15)} color='#002a32'/>
                                <TextInput
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                                {errors.date && <SubText style={styles.error} title='This is required.'/>}

                            </ROW>
                        )}
                        name="date"
                    />
                    <Controller
                        control={control}
                        rules={{
                            required: true,

                        }}
                        render={({field: {onChange, onBlur, value}}) => (
                            <ROW mv={scale(20)}>

                            <SubText title='Start Time' size={scale(15)} color='#002a32'/>
                                <TextInput
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                                {errors.timeStart && <SubText style={styles.error} title='This is required.'/>}

                            </ROW>
                        )}
                        name="timeStart"
                    />
                    <Controller
                        control={control}
                        rules={{
                            required: true,

                        }}
                        render={({field: {onChange, onBlur, value}}) => (
                            <ROW>
                                <SubText title='End Time' size={scale(15)} color='#002a32'/>
                                <TextInput
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                                {errors.timeEnd && <SubText style={styles.error} title='This is required.'/>}

                            </ROW>
                        )}
                        name="timeEnd"
                    />

 <Controller
                        control={control}
                        rules={{
                            required: true,

                        }}
                        render={({field: {onChange, onBlur, value}}) => (
                            <ROW mv={scale(20)}>

                            <SubText title='Date End' size={scale(15)} color='#002a32'/>
                                <TextInput
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                                {errors.endDate && <SubText style={styles.error} title='This is required.'/>}

                            </ROW>
                        )}
                        name="endDate"
                    />

 <Controller
                        control={control}
                        rules={{
                            required: true,

                        }}
                        render={({field: {onChange, onBlur, value}}) => (
                            <ROW>
                                <SubText title='Sports' size={scale(15)} color='#002a32'/>
                                <TextInput
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                                {errors.sports && <SubText style={styles.error} title='This is required.'/>}

                            </ROW>
                        )}
                        name="sports"
                    />
 <Controller
                        control={control}
                        rules={{
                            required: true,

                        }}
                        render={({field: {onChange, onBlur, value}}) => (
                            <ROW mv={scale(20)}>

                            <SubText title='Cost' size={scale(15)} color='#002a32'/>
                                <TextInput
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                                {errors.cost && <SubText style={styles.error} title='This is required.'/>}

                            </ROW>
                        )}
                        name="cost"
                    />
                    <Controller
                        control={control}
                        rules={{
                            required: true,

                        }}
                        render={({field: {onChange, onBlur, value}}) => (
                            <ROW mb={scale(20)}>

                            <SubText title='Description' size={scale(15)} color='#002a32'/>
                                <TextInput
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                                {errors.desc && <SubText style={styles.error} title='This is required.'/>}

                            </ROW>
                        )}
                        name="desc"
                    />
                    <CustomButton title='Submit' onPress={handleSubmit(onSubmit)}/>
                </ROW>
            </Layout>
        </ScrollView>
    );
};

export default CreateForm1;
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
