import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import apodJSON from '../src/data/apods.json'
import ApodListItem from "../src/components/ApodListItem";
import FullScreenImage from "../src/components/FullScreenImage";
import { Apod } from "../src/types";
import { fetchApods } from "../src/api/apods";

export default function Page() {
  const [apods, setApods]= useState<Apod[]>(null)
  const [acttivePicture, setActivePicture] = useState<string>(null)
  //alert('e be things')
  useEffect(() => {
    fetchApods().then(setApods)
  }, [])

  if(!apods){
    return <ActivityIndicator />
  }

  return (
    <>
      <FlatList 
        data={apods} 
        renderItem={({item}) => <ApodListItem apod={item} onImagePress={() => {setActivePicture( item.url )}} />}
      />
      <FullScreenImage url={acttivePicture} onClose={() => setActivePicture(null)}/>
    </>
  )
}
