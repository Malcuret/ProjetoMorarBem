import { useState } from 'react';
import { api } from '../services/api';

const digitos = (valor) => valor.replace(/\D/g, '').slice(0, 11);

const formatar = (valor) => {
    const numero = digitos(valor);

    if (numero.length <= 2) return numero;

    if (numero.length <= 6) {
        return '(' + numero.slice(0, 2) + ') ' + numero.slice(2);
    }

    if (numero.length <= 10) {
        return (
            '(' +
            numero.slice(0, 2) +
            ') ' +
            numero.slice(2, 6) +
            '-' +
            numero.slice(6)
        );
    }

    return (
        '(' +
        numero.slice(0, 2) +
        ') ' +
        numero.slice(2, 7) +
        '-' +
        numero.slice(7)
    );
};

export default function FormularioLead({ codigoImovel }) {
    const [telefone, setTelefone] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [enviando, setEnviando] = useState(false);

    async function enviar(evento) {
        evento.preventDefault();

        if (!/^[1-9]\d{9,10}$/.test(telefone)) {
            setMensagem(
                'Informe um telefone com DDD válido, com 10 ou 11 números.'
            );
            return;
        }

        setEnviando(true);
        setMensagem('');

        try {
            const resposta = await api.post('/leads', {
                codigo_imovel: codigoImovel,
                telefone,
            });

            setTelefone('');
            setMensagem(
                resposta.data.message || 'Interesse enviado com sucesso!'
            );
        } catch (erro) {
            setMensagem(
                erro.response?.data?.error ||
                    'Não foi possível enviar seu interesse. Tente novamente.'
            );
        } finally {
            setEnviando(false);
        }
    }

    return (
        <form className="lead-form" onSubmit={enviar} noValidate>
            <h2>Tenho interesse</h2>

            <label htmlFor="telefone">Telefone ou WhatsApp</label>

            <input
                id="telefone"
                name="telefone"
                type="tel"
                value={formatar(telefone)}
                onChange={(evento) => {
                    setTelefone(digitos(evento.target.value));
                    setMensagem('');
                }}
                placeholder="(11) 99999-9999"
                inputMode="numeric"
                autoComplete="tel"
                maxLength={15}
                required
            />

            <button
                className="button"
                type="submit"
                disabled={enviando}
            >
                {enviando ? 'Enviando...' : 'Enviar interesse'}
            </button>

            {mensagem && (
                <p className="form-message" role="status">
                    {mensagem}
                </p>
            )}
        </form>
    );
}