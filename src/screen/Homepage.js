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
    name: "Tiles1",
    price: 500,
    quantity: 50,
    retailQuantity: 50,
    description: 10,
    unitType: 0,
    supportsRetail: false,
    retailUnitType: 0,
    trend: 102
}

export default function Homepage() {
    const [unitTypesRead, setUnitTypesRead] = useState(false)
    const [unitTypesMap, setUnitTypesMap] = useState([]);
    useEffect(() => {
        async function getProductUnits() {
            if (unitTypesRead == false){
                const response = await fetch('https://saleex.in/identityserver/Config/ProductUnits', {
                    headers: {
                        // "Authorization": `Bearer ${user?.access_token}`
                        "Authorization": `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6InByQloxU0JvODQwN3hCZm9XM3VxRlEiLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE2ODYwMjM3MTUsImV4cCI6MTY4NjAzODExNSwiaXNzIjoiaHR0cHM6Ly9zYWxlZXguaW4vaWRlbnRpdHlzZXJ2ZXIiLCJhdWQiOiJoaXZlVUlDbGllbnQiLCJjbGllbnRfaWQiOiJIaXZlV2ViVUkiLCJzdWIiOiJIaXZlQWRtaW4iLCJhdXRoX3RpbWUiOjE2ODYwMjM3MTUsImlkcCI6ImxvY2FsIiwiUmVzb3VyY2UiOiJBbGwiLCJSb2xlIjoiMTAxIiwiQmVsb25nc1RvIjoiMTAwIiwiU3ViamVjdCI6IjEwMCIsInNjb3BlIjpbImhpdmVVSUNsaWVudCJdLCJhbXIiOlsicHdkIl19.wsSG6u8oP9SdFTKwoZMprCF_YBo0_QYHT1ybHN7azIpHhDgZD1NTJ5ClVQW2vzutQ3cZs8nxXAIkb5n-sgjlvdw_jQcZbMGzbAPb88K707hWIpZWWcRsVY3n3Ue1ZuDtPxUwTh9SII5Lm_ix_v0xjkqDerYanY4vSxZDFkJdRjNqkAQ3_O2VXcjTunsRuSBV54ZmrXhoToCHY5dTNisHz_DOciVqqU0dlIXFd_s6V14HkkUkb4PG4vTu3_IbavC0AE7GZED3o-aNn50MbioBjpLypBAwmIgLN-PWv_UAy4ycfpVG_tzF7OmkvXNpogfJdrPM3EhA5B8ONVLPSCP5tg`
                    }
                });
    
                if (response.ok == true) {
                    const data = await response.json();
                    if (data.isSuccess == true) {
                        // console.log("data.isSuccess");
                        // console.log(JSON.stringify(data.response));
                        data.response.productUnits.map((productUnit, key) => {
                            var unitID = productUnit.productUnitId;
                            unitTypesMap.push({
                                [unitID]: productUnit.name
                             });
                         });
                         setUnitTypesRead(true);
                    } else {
                        setUnitTypesRead(false);
                        ToastAndroid.show(data.message, ToastAndroid.SHORT)
                    }
                }
            }
        }
        getProductUnits().catch(err => {
            ToastAndroid.show(err.message, ToastAndroid.SHORT)
        })

      }, []); // <- add empty brackets here

    return <View style={styles.view}>{
        unitTypesRead && <View style={styles.view}>
                <Image  
                    source={{    
                    uri: 'https://saleex.in/hivemedia/Media/ProductResourceV2?url=100-201-100-1-1&displayTypeId=102&productId=100',
                    method: 'GET',
                    headers: 
                    {
                        Authorization: `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6InByQloxU0JvODQwN3hCZm9XM3VxRlEiLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE2ODYwMjM3MTUsImV4cCI6MTY4NjAzODExNSwiaXNzIjoiaHR0cHM6Ly9zYWxlZXguaW4vaWRlbnRpdHlzZXJ2ZXIiLCJhdWQiOiJoaXZlVUlDbGllbnQiLCJjbGllbnRfaWQiOiJIaXZlV2ViVUkiLCJzdWIiOiJIaXZlQWRtaW4iLCJhdXRoX3RpbWUiOjE2ODYwMjM3MTUsImlkcCI6ImxvY2FsIiwiUmVzb3VyY2UiOiJBbGwiLCJSb2xlIjoiMTAxIiwiQmVsb25nc1RvIjoiMTAwIiwiU3ViamVjdCI6IjEwMCIsInNjb3BlIjpbImhpdmVVSUNsaWVudCJdLCJhbXIiOlsicHdkIl19.wsSG6u8oP9SdFTKwoZMprCF_YBo0_QYHT1ybHN7azIpHhDgZD1NTJ5ClVQW2vzutQ3cZs8nxXAIkb5n-sgjlvdw_jQcZbMGzbAPb88K707hWIpZWWcRsVY3n3Ue1ZuDtPxUwTh9SII5Lm_ix_v0xjkqDerYanY4vSxZDFkJdRjNqkAQ3_O2VXcjTunsRuSBV54ZmrXhoToCHY5dTNisHz_DOciVqqU0dlIXFd_s6V14HkkUkb4PG4vTu3_IbavC0AE7GZED3o-aNn50MbioBjpLypBAwmIgLN-PWv_UAy4ycfpVG_tzF7OmkvXNpogfJdrPM3EhA5B8ONVLPSCP5tg`
                    },
                    body: 'Your Body goes here'  
                    }} 
                    style={{ width: 400, height: 400 }}
                    onLoadStart={() => console.log("onLoadStart")}
                    onLoadEnd={() => console.log("onLoadEnd")}
                    onError={({ nativeEvent: {error} }) => console.log(error)}/>
                <Image
                    source={
                    { uri: 'https://saleex.in/hivemedia/Media/ProductResourceV2?url=100-201-100-1-1&displayTypeId=102&productId=100',
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6InByQloxU0JvODQwN3hCZm9XM3VxRlEiLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE2ODYwMjM3MTUsImV4cCI6MTY4NjAzODExNSwiaXNzIjoiaHR0cHM6Ly9zYWxlZXguaW4vaWRlbnRpdHlzZXJ2ZXIiLCJhdWQiOiJoaXZlVUlDbGllbnQiLCJjbGllbnRfaWQiOiJIaXZlV2ViVUkiLCJzdWIiOiJIaXZlQWRtaW4iLCJhdXRoX3RpbWUiOjE2ODYwMjM3MTUsImlkcCI6ImxvY2FsIiwiUmVzb3VyY2UiOiJBbGwiLCJSb2xlIjoiMTAxIiwiQmVsb25nc1RvIjoiMTAwIiwiU3ViamVjdCI6IjEwMCIsInNjb3BlIjpbImhpdmVVSUNsaWVudCJdLCJhbXIiOlsicHdkIl19.wsSG6u8oP9SdFTKwoZMprCF_YBo0_QYHT1ybHN7azIpHhDgZD1NTJ5ClVQW2vzutQ3cZs8nxXAIkb5n-sgjlvdw_jQcZbMGzbAPb88K707hWIpZWWcRsVY3n3Ue1ZuDtPxUwTh9SII5Lm_ix_v0xjkqDerYanY4vSxZDFkJdRjNqkAQ3_O2VXcjTunsRuSBV54ZmrXhoToCHY5dTNisHz_DOciVqqU0dlIXFd_s6V14HkkUkb4PG4vTu3_IbavC0AE7GZED3o-aNn50MbioBjpLypBAwmIgLN-PWv_UAy4ycfpVG_tzF7OmkvXNpogfJdrPM3EhA5B8ONVLPSCP5tg`
                            }
                            }
                    }/>
                <OrderItem currentProduct={productItem} unitTypesMap={unitTypesMap} />
                <OrderItem currentProduct={productItem} unitTypesMap={unitTypesMap} />
                <OrderItem currentProduct={productItem} unitTypesMap={unitTypesMap} />
            </View>
        }
    </View>
}