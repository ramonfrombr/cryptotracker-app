import { TouchableOpacity } from "@gorhom/bottom-sheet";
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const ItemLista = ({
	nome,
	simbolo,
	precoAtual,
	porcentagemAlteracaoPreco7d,
	logoURL,
	onPress,
}) => {
	const corAlteracaoPreco =
		porcentagemAlteracaoPreco7d > 0 ? "#34C759" : "#FF3B30";

	return (
		<TouchableOpacity onPress={onPress}>
			<View style={estilos.itemWrapper}>
				{/* Lado Esquerdo */}
				<View style={estilos.lado_esquerdo}>
					<Image
						style={estilos.criptoLogo}
						source={{
							uri: logoURL,
						}}
					/>

					<View style={estilos.titulosWrapper}>
						<Text style={estilos.titulo}>{nome}</Text>
						<Text style={estilos.subtitulo}>{simbolo.toUpperCase()}</Text>
					</View>
				</View>

				{/* Lado Direto */}
				<View style={estilos.lado_direito}>
					<Text style={estilos.precoAtual}>${precoAtual}</Text>
					<Text
						style={(estilos.porcentagemAlteracao, { color: corAlteracaoPreco })}
					>
						{porcentagemAlteracaoPreco7d.toFixed(2)}%
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

const estilos = StyleSheet.create({
	itemWrapper: {
		paddingHorizontal: 16,
		marginTop: 24,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},

	criptoLogo: {
		width: 48,
		height: 48,
	},

	lado_esquerdo: {
		flexDirection: "row",
	},

	lado_direito: {
		textAlign: "right",
	},

	titulo: {},

	subtitulo: {},

	precoAtual: {
		textAlign: "right",
	},

	porcentagemAlteracao: {
		textAlign: "right",
	},
});

export default ItemLista;
