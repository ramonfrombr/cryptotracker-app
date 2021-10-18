import { StatusBar } from "expo-status-bar";
import React, { useRef, useMemo, useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	FlatList,
	SafeAreaView,
} from "react-native";
import ItemLista from "./components/ItemLista";

import {
	BottomSheetModal,
	BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

import Grafico from "./components/Grafico";

import { selecionarDadosMercado } from "./servicos/servicoCripto";

export default function App() {
	const [dados, definirDados] = useState([]);

	const [dadosMoedaSelecionada, definirDadosMoedaSelecionada] = useState(null);

	useEffect(() => {
		const consultarDadosMercado = async () => {
			const dadosMercado = await selecionarDadosMercado();
			definirDados(dadosMercado);
		};

		consultarDadosMercado();
	}, []);

	// ref
	const bottomSheetModalRef = useRef(null);

	// variables
	const snapPoints = useMemo(() => ["60%"], []);

	const abrirModal = (item) => {
		definirDadosMoedaSelecionada(item);
		bottomSheetModalRef.current.present();
	};

	return (
		<BottomSheetModalProvider>
			<SafeAreaView style={estilos.container}>
				<View style={estilos.tituloWrapper}>
					<Text style={estilos.tituloLargo}>Criptomoedas</Text>
				</View>

				<View style={estilos.divisor} />

				<FlatList
					keyExtractor={(item) => item.id}
					data={dados}
					renderItem={({ item }) => (
						<ItemLista
							nome={item.name}
							simbolo={item.symbol}
							precoAtual={item.current_price}
							porcentagemAlteracaoPreco7d={
								item.price_change_percentage_7d_in_currency
							}
							logoURL={item.image}
							onPress={() => abrirModal(item)}
						/>
					)}
				/>
			</SafeAreaView>

			<BottomSheetModal
				ref={bottomSheetModalRef}
				index={0}
				snapPoints={snapPoints}
				style={estilos.bottomSheet}
			>
				<View style={estilos.bottomSheetConteudo}>
					{dadosMoedaSelecionada ? (
						<Grafico
							precoAtual={dadosMoedaSelecionada.current_price}
							logoURL={dadosMoedaSelecionada.image}
							nome={dadosMoedaSelecionada.name}
							simbolo={dadosMoedaSelecionada.symbol}
							porcentagemAlteracaoPreco7d={
								dadosMoedaSelecionada.price_change_percentage_7d_in_currency
							}
							linha={dadosMoedaSelecionada.sparkline_in_7d.price}
						/>
					) : null}
				</View>
			</BottomSheetModal>
		</BottomSheetModalProvider>
	);
}

const estilos = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},

	tituloWrapper: {
		marginTop: 30,
		paddingHorizontal: 16,
	},

	tituloLargo: {
		fontSize: 24,
		fontWeight: "bold",
	},

	divisor: {
		height: StyleSheet.hairlineWidth,
		backgroundColor: "#A9ABB1",
		marginHorizontal: 16,
		marginTop: 16,
	},

	bottomSheet: {
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},

	bottomSheetConteudo: {
		backgroundColor: "#FAFAFA",
		height: "100%",
	},
});
