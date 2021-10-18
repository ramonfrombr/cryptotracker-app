import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";

import {
	ChartDot,
	ChartPath,
	ChartPathProvider,
	ChartYLabel,
} from "@rainbow-me/animated-charts";

import { useSharedValue } from "react-native-reanimated";

const { width: SIZE } = Dimensions.get("window");

const Grafico = ({
	precoAtual,
	logoURL,
	nome,
	simbolo,
	porcentagemAlteracaoPreco7d,
	linha,
}) => {
	const ultimoPrecoAtual = useSharedValue(precoAtual);

	const [graficoPronto, definirGraficoPronto] = useState(false);

	const corPrecoAlterado =
		porcentagemAlteracaoPreco7d > 0 ? "#34C759" : "#FF3B30";

	useEffect(() => {
		ultimoPrecoAtual.value = precoAtual;

		setTimeout(() => {
			definirGraficoPronto(true);
		}, 0);
	}, [precoAtual]);

	const formatoUSD = (value) => {
		"worklet";
		if (value === "") {
			return `$${ultimoPrecoAtual.value.toLocaleString("en-US", {
				currency: "USD",
			})}`;
		}

		const valorFormatado = `$${parseFloat(value)
			.toFixed(2)
			.replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;

		return valorFormatado;
	};

	return (
		<ChartPathProvider data={{ points: linha, smoothingStrategy: "bezier" }}>
			<View style={estilos.grafico}>
				<View style={estilos.titulosWrapper}>
					<View style={estilos.titulosCima}>
						<View style={estilos.tituloCimaEsquerda}>
							<Image style={estilos.imagem} source={{ uri: logoURL }}></Image>
							<Text>
								{nome} ({simbolo.toUpperCase()})
							</Text>
						</View>
						<Text style={estilos.subtitulo}>7d</Text>
					</View>

					<View style={estilos.titulosBaixo}>
						<ChartYLabel format={formatoUSD} style={estilos.tituloDestacado} />
						{/*<Text style={estilos.tituloDestacado}>
							${precoAtual.toLocaleString("en-US", { currency: "USD" })}
    </Text>*/}
						<Text style={estilos.titulo}>
							{porcentagemAlteracaoPreco7d.toFixed(2)}%
						</Text>
					</View>
				</View>

				{graficoPronto ? (
					<View style={estilos.graficoLinhaWrapper}>
						<ChartPath height={SIZE / 2} stroke="black" width={SIZE} />
						<ChartDot style={{ backgroundColor: "black" }} />
					</View>
				) : null}
			</View>
		</ChartPathProvider>
	);
};

const estilos = StyleSheet.create({
	grafico: {
		marginVertical: 16,
	},

	titulosWrapper: {
		marginHorizontal: 16,
	},

	titulosCima: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},

	tituloCimaEsquerda: {
		flexDirection: "row",
		alignItems: "center",
	},

	imagem: {
		width: 24,
		height: 24,
	},

	subtitulo: {
		fontSize: 14,
		color: "#A9ABB1",
	},

	titulosBaixo: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},

	tituloDestacado: {
		fontSize: 14,
		color: "#A9ABB1",
	},

	titulo: {},

	graficoLinhaWrapper: {
		marginTop: 10,
	},
});

export default Grafico;
