import React, { useState } from 'react';
import {ActivityIndicator, Image, Platform, SafeAreaView, ScrollView, TextInput, TouchableOpacity} from "react-native";


import {scale} from "react-native-size-matters";


import {useNavigation} from "@react-navigation/native";


import { useMutation, useQueries, useQueryClient } from 'react-query';
import ROW from '../../components/shared/ROW';
import { BackIcon } from '../../components/shared/Icons';
import TitleText from '../../components/shared/TitleText';
import Br from '../../components/shared/Br';
import FastImage from 'react-native-fast-image';
import CustomButton from '../../components/shared/CustomButton';
import userStore from '../../store/user.store';
import { createFacility } from '../../services/Api/Court';
import DynamicInput from '../../components/shared/DynamicInput';


const AddCourtScreen = () => {
    const navigation = useNavigation()
    const {isLoading,mutateAsync,error} = useMutation((data)=>createFacility(data))
    const queryClient = useQueryClient();
    const [name,setName] = useState("");
    const [hardCourt,setHardCourt] = useState(0);
    const [clayCourt,setClayCourt] = useState(0);
    const [grassCourt,setGrassCourt] = useState(0);
    const [pickleBallCourt,setPickleBallCourt] = useState(0);
    const [description,setDescription] = useState("");
    const [phone,setPhone] = useState("");
    const [website,setWebsite] = useState("");
    const [email,setEmail] = useState("");

    const [address,setAddress] = useState({
        line1:null,
        line2:null,
        line3:null,
        city:null,
        countryCode:null,
        CountryDistrictname:null,
        zipCodePostalCode:null,
        stateProvinceCode:null,
        otherDetails:null,
        latitude:null,
        longitude:null,
    });

    const fields = [
        {name:'Name',type:'text',value:name,setValue:setName},
        {name:'Hard Court',type:'number',value:hardCourt,setValue:setHardCourt},
        {name:'Clay Court',type:'number',value:clayCourt,setValue:setClayCourt},
        {name:'Grass Court',type:'number',value:grassCourt,setValue:setGrassCourt},
        {name:'PickleBall Court',type:'number',value:pickleBallCourt,setValue:setPickleBallCourt},
        {name:'Description',type:'longtext',value:description,setValue:setDescription},
        {name:'Phone',type:'text',value:phone,setValue:setPhone},
        {name:'Website',type:'text',value:website,setValue:setWebsite},
        {name:'Email',type:'text',value:email,setValue:setEmail},
        
    ];

    const submitFacility = () =>{
        let payload = {
            name,
            hardCourt,
            clayCourt,
            grassCourt,
            pickleBallCourt,
            description,
            phone,
            website,
            email,
            ...address
        }
        mutateAsync(payload).then(res=>{
            queryClient.invalidateQueries(['courts']);
            navigation.goBack();
        })
    }

    
    return (
        <SafeAreaView>
        <ScrollView nestedScrollEnabled={true} stickyHeaderIndices={[2]}
                    style={{width: '100%', backgroundColor: '#fff'}}>
            <ROW>
                <ROW ph={scale(10)} pv={scale(5)} bg='#fff'>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{padding: scale(5)}}>
                        <ROW row aligncenter>
                            <BackIcon/>
                            <TitleText style={{marginLeft: scale(10)}}>Add Facility</TitleText>
                        </ROW>
                    </TouchableOpacity>
                </ROW>
                <Br/>
            </ROW>
            <ROW w={'100%'} bg='white' p={scale(10)}>
                
                
                <ROW p={scale(5)}>
                {fields.map(res=><DynamicInput name={res.name} type={res.type} value={res.value} setValue={res.setValue}/>)}

                
                    
                    <CustomButton onPress={()=>submitDiscussion()} title={isLoading?<ActivityIndicator size={'small'} color={'white'} />:'Submit'} style={{paddingVertical: scale(10), marginTop: scale(10)}}/>
                </ROW>


            </ROW>

        </ScrollView>
        </SafeAreaView>
    );
};


export default AddCourtScreen;
