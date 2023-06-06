import React, { useContext, useEffect, useState } from "react";
import { View, Text, TextInput, StatusBar, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import { SIZES, COLORS, FONTS } from "../constants";
import { Entypo, AntDesign, MaterialCommunityIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';


const styles = StyleSheet.create({
    view: {
        flex: 1,
        width: '100%',
        paddingVertical: SIZES.vPadding,
        paddingHorizontal: SIZES.hPadding,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.baseBk
    },
    card2: {
        flex: 1,
        backgroundColor: COLORS.blockBk,
        margin: SIZES.containerPadding,
        borderRadius: SIZES.radius,
        padding: 10,
    },
    label: {
        fontSize: 18,
        color: COLORS.primaryFontColor,
    },
    textII: {
        backgroundColor: COLORS.primaryFontColor,
        paddingLeft: 8,
        fontSize: 18,
        textAlign: 'center',
        color: COLORS.grey,
        backgroundColor: 'transparent',
        borderBottomWidth: 0,
        shadowColor: 'transparent',
    },
    row3: {
        marginTop: '2%',
        flexDirection: 'row',
        flex: 1,
        height: 100, 
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        textAlign: 'center',
    },
    und: {
        color: COLORS.grey,
        fontSize: 18,
    },
})

export default function OrderItem({currentProduct, unitTypesMap}) {
    const [count, setCount] = useState("1")
    const [retailCount, setRetailCount] = useState(1)
    // console.log("currentProduct:", currentProduct);
    // console.log("unitTypesMap:", unitTypesMap);
    
    return <View style={styles.card2}>
        <View>
            <Text style={styles.label}>Product</Text>
            <TouchableOpacity activeOpacity={0.5}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderColor: COLORS.grey }}>
                    <TextInput style={styles.textII} mode="flat" defaultValue={currentProduct?.name} />
                    <Entypo name="chevron-down" size={28} color={COLORS.primaryFontColor} />
                </View>
            </TouchableOpacity>
        </View>
        <View style={styles.row3}>
            <Text style={{ color: COLORS.primaryFontColor, fontSize: 18, flex: 1 }}>Price</Text>
            <Text style={{ color: COLORS.primaryFontColor, fontSize: 18, flex: 1 }}>Quantity </Text>
            <Text style={{ color: COLORS.primaryFontColor, fontSize: 18, flex: 1 }}>Unit </Text>
        </View>
        <View style={styles.row3}>
            <Text style={styles.und}>{currentProduct?.price ? currentProduct?.price : '0'}</Text>
            <TextInput style={styles.und} value={count} onChangeText={setCount} keyboardType="number-pad" />
            <Text style={styles.und}>Numbers</Text>
        </View>
    </View>
}