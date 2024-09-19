import { Image, Pressable, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { icons } from '@/constants';
import * as ImagePicker from 'expo-image-picker';
import ImagePreview from '@/components/ImagePreview';
import axios from '@/lib/axios';
import VideoPlayer from '@/components/VideoPlayer';
import { router } from 'expo-router';
import Modal from "react-native-modal";
import { getItem } from 'expo-secure-store';



const Create = () => {
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);

    let [form, setForm] = useState({
        title: '',
        description: '',
        video: "",
        thumbnail: ''
    });

    let storeFile = async (file) => {
        try {
            const formData = new FormData();
            // const imageUri = Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri;
            // console.log(imageUri)
            formData.append('image', {
                uri: file.uri,
                name: file.fileName ?? 'default',
                type: file.type, // Image MIME type, e.g. 'image/jpeg'
            });
            let res = await axios.post('/api/images', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${await getItem('token')}`
                },
            })

            return res.data.uri
        } catch (e) {
            console.log(e)
            return null;
        }
    }

    const pickMediaAsync = async (type) => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                quality: 1,
                mediaTypes: type === 'image' ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos
            });
            let file = result.assets[0];
            if (type === 'image') {
                setImage(file);
            }
            if (type === 'video') {
                setVideo(file);
            }
            let uri = await storeFile(file);
            if (uri) {
                setForm(prev => ({ ...prev, thumbnail: uri }))
            }
        } catch (e) {
            setImage(null);
            setVideo(null);
            console.log('error on pickMediaAsync', e)
        }
    }

    let Upload = async () => {
        try {
            if (!form.title || !form.description || !form.thumbnail) {
                setShowModal(true)
            }
            setLoading(true);
            let res = await axios.post('/api/videos', form, {
                headers: {
                    'Authorization': `Bearer ${await getItem('token')}`
                }
            });
            if (res.status === 200) {
                setLoading(false);
                setForm({
                    title: '',
                    description: '',
                    video: "",
                    thumbnail: ''
                })
                setImage(null);
                setVideo(null);
                return router.navigate({
                    pathname: '/home',
                    params: {
                        videoId: res.data.data.id
                    }
                });
            }
        } catch (e) {
            setLoading(false);
            console.log('error happned on upload function', e)
        }
    }

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView className="px-4">
                <Modal isVisible={showModal} onBackdropPress={() => setShowModal(false)}>
                    <View className="justify-center items-center min-h-24 p-5 bg-primary rounded-xl">
                        <Text className="text-center text-lg font-bold text-white">Please Fill All The Fields</Text>
                        <Text className="text-center text-sm mt-3 text-gray-100">Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde provident adipisci ipsam numquam facilis consequuntur, molestiae laudantium dolore eligendi, esse aperiam qui aliquid asperiores perferendis tempora expedita mollitia hic doloremque.</Text>
                    </View>
                </Modal>
                <Text className="mt-4 text-white font-bold text-2xl">Upload Video</Text>
                <View className="mt-2">
                    <FormField title="Video Title" value={form.title} onChangeText={e => setForm({ ...form, title: e })} otherStyles="mt-7" keyboardType="text" placeHolder="type your video title" />
                </View>
                <View className="mt-2">
                    <FormField multiline title="Video Description" value={form.description} onChangeText={e => setForm({ ...form, description: e })} otherStyles="mt-7" keyboardType="text" placeHolder="type your video description" />
                </View>
                <View className="mt-7 juce">
                    <Text className="text-base text-gray-100 font-pmedium">Upload Video</Text>
                    {video ? (
                        <VideoPlayer video={video.uri} />
                    ) : (
                        <TouchableOpacity onPress={() => pickMediaAsync('video')} >
                            <View className="w-full h-40 rounded-2xl mt-2 bg-black-100 justify-center items-center">
                                <View className="w-14 h-14 border-secondary-200 border-dashed border-2 justify-center items-center">
                                    <Image source={icons.upload} className="w-1/2 h-1/2" resizeMode='contain' />
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                </View>
                <View className="mt-7 juce">
                    <Text className="text-base text-gray-100 font-pmedium">Upload Thumbnail</Text>
                    {image ? (
                        <View className="relative">
                            <ImagePreview images={[image]} />
                            <Pressable onPress={() => setImage(null)} className="absolute -top-1 right-0">
                                <Image source={icons.close} className="text-white w-6 h-6" resizeMode='contain' />
                            </Pressable>
                        </View>
                    ) : (
                        <TouchableOpacity onPress={() => pickMediaAsync('image')}>
                            <View className="w-full h-20 rounded-2xl mt-2 bg-black-100 justify-center items-center">
                                <Image source={icons.upload} className="w-6 h-6" resizeMode='contain' />
                            </View>
                        </TouchableOpacity>)}
                </View>
                <View className="mt-7">
                    <CustomButton title="Upload" onPress={Upload} isLoading={loading} />
                </View>
            </ScrollView >
        </SafeAreaView >
    )
}

export default Create

