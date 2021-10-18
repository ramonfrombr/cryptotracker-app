import axios from "axios";
import moment from "moment";

export const selecionarDadosMercado = async () => {
	const formatarLinhaGrafico = (numeros) => {
		const seteDiasAtras = moment().subtract(7, "days").unix();

		let linhaGraficoFormatada = numeros.map((item, indice) => {
			return {
				x: seteDiasAtras + (indice + 1) * 3600,
				y: item,
			};
		});

		return linhaGraficoFormatada;
	};

	const formatarDadosMercado = (dados) => {
		let dadosFormatados = [];

		dados.forEach((item) => {
			const linhaGraficoFormatada = formatarLinhaGrafico(
				item.sparkline_in_7d.price
			);

			const itemFormatado = {
				...item,
				sparkline_in_7d: {
					price: linhaGraficoFormatada,
				},
			};

			dadosFormatados.push(itemFormatado);
		});

		return dadosFormatados;
	};

	try {
		// chamada api
		const resposta = await axios.get(
			"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=7d"
		);

		const dados = resposta.data;

		const respostaFormatada = formatarDadosMercado(dados);

		return respostaFormatada;
	} catch (erro) {
		console.log(erro.message);
	}
};
