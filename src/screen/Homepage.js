import React, { useContext, useEffect, useState } from "react";
import { View, Image, Text, StatusBar, StyleSheet } from "react-native";
import { SIZES, COLORS, FONTS } from "../constants";
import { OrderItem } from "../components";
import Card from "../components/card";

const styles = StyleSheet.create({
    view: {
        paddingTop: Platform.OS === "ios" ? 40 : StatusBar.currentHeight + 10,
        flex: 1,
        width: '100%',
        backgroundColor: COLORS.baseBk
    }
})
let quantity = {
    count: "10",
    retailCount: "2"
}

let props2 = {
    text:"This is orderitem",
    isSelected: false
}

let product = {
    productId: 100,
    productImageUrls: [
        "100-201-100-1-1"
    ],
    slug: "100-201-100-1",
    name: "Tiles1",
    categoryName: "Tiles",
    brandName: "Tilex",
    price: 500,
    salePrice: 500,
    discount: 10,
    isAvailable: true,
    trend: 102
}

let productItem = {
    productId: 100,
    slug: "100-201-100-1",
    name: "Tiles2",
    price: 500,
    quantity: 50,
    retailQuantity: 50,
    description: 10,
    unitType: 0,
    supportsRetail: false,
    retailUnitType: 0,
    trend: 102
}
let token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6InByQloxU0JvODQwN3hCZm9XM3VxRlEiLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE2ODYxMDczMzMsImV4cCI6MTY4NjEyMTczMywiaXNzIjoiaHR0cHM6Ly9zYWxlZXguaW4vaWRlbnRpdHlzZXJ2ZXIiLCJhdWQiOiJoaXZlVUlDbGllbnQiLCJjbGllbnRfaWQiOiJIaXZlV2ViVUkiLCJzdWIiOiJIaXZlQWRtaW4iLCJhdXRoX3RpbWUiOjE2ODYxMDczMzIsImlkcCI6ImxvY2FsIiwiUmVzb3VyY2UiOiJBbGwiLCJSb2xlIjoiMTAxIiwiQmVsb25nc1RvIjoiMTAwIiwiU3ViamVjdCI6IjEwMCIsInNjb3BlIjpbImhpdmVVSUNsaWVudCJdLCJhbXIiOlsicHdkIl19.Wi6CJ7A-zduZ6uf9uMu1Mv8bpNfCKngEqiHjdATsprInLB0L82cwFRyHx8jY_ERHKkl1pkRDhxwfaa0_66v7qtLGVj17nD1-o3ZWm9LKa7uH1qIxLFlabsOV3fyYR9XGGNOa0u66ycA_J3CDBT0Y1pAcaIpwHgyEWz1YMgQDFcXr7dhcWAIL14vy7kilavQhyg6tTb6aaUJjyWxNpve27raD2a9-hgsvxq7a9tiHuYsOGjQReBCQ-dccxoS4SbB9wUkOl8nDLreNS-smsf27Gsx7Ma7HebtJy4ky6BNx2N6rD3egTDI14w5EJ-WzIppoLhBjxenS5r3u6TBXkDaXLw';

export default function Homepage() {
    const [unitTypesRead, setUnitTypesRead] = useState(false)
    const [unitTypesMap, setUnitTypesMap] = useState([]);
    useEffect(() => {
        async function getProductUnits() {
            if (unitTypesRead == false){
                const response = await fetch('https://saleex.in/identityserver/Config/ProductUnits', {
                    headers: {
                        "Authorization": `Bearer ` + token,
                    }
                });
    
                if (response.ok == true) {
                    const data = await response.json();
                    console.log("response.ok");
                    if (data.isSuccess == true) {
                        console.log("data.isSuccess");
                        // console.log(JSON.stringify(data.response));
                        data.response.productUnits.map((productUnit, key) => {
                            var unitID = productUnit.productUnitId;
                            unitTypesMap.push({
                                [unitID]: productUnit.name
                             });
                         });
                         setUnitTypesRead(true);
                    } else {
                        console.log("data.message");
                        //ToastAndroid.show(data.message, ToastAndroid.SHORT)
                    }
                } else {
                    console.log("data.message2");
                    console.log(response);
                }
            }
        }
        getProductUnits().catch(err => {
            console.log("err.message");
            console.log(err.message);
            //ToastAndroid.show(err.message, ToastAndroid.SHORT)
        })

      }, []); // <- add empty brackets here

    return <View style={styles.view}>{
        unitTypesRead && <View style={styles.view}>
                <Image  
                    source={{    
                        uri: 'https://saleex.in/hivemedia/Media/ProductResource?url=100-201-100-1-1&displayTypeId=102&productId=100',
                        method: 'GET',
                    headers: {
                        "Authorization": `Bearer ` + token
                    }  
                    }} 
                    style={{ width: 120, height: 120 }}
                    onLoadStart={() => console.log("onLoadStart")}
                    onLoadEnd={() => console.log("onLoadEnd")}
                    onError={({ nativeEvent: {error} }) => console.log(error)}/>
                <OrderItem currentProduct={productItem} unitTypesMap={unitTypesMap} />
                <OrderItem currentProduct={productItem} unitTypesMap={unitTypesMap} />
                <OrderItem currentProduct={productItem} unitTypesMap={unitTypesMap} />
            </View>
        }
    </View>
}