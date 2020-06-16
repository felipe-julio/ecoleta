import React, {useEffect, useState, useDebugValue } from 'react'; 
import { Link } from 'react-router-dom'
import { FiArrowLeft} from 'react-icons/fi'; 
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import api from '../../services/api'
import axios from 'axios'

import './styles.css'

import logo from '../../assets/logo.svg'

// array ou objeto: manualmente informar o tipo da variavel

interface Item {
    id: number;
    title: string;
    image_url: string;
}


interface IBGEUFResponse {
    sigla: string;
}

const CreatePoint = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [ufs, setUfs] = useState<string[]>([]);

    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data);
        });
    }, [])

    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
        const initials  = response.data.map(uf => uf.sigla);
        setUfs(initials);
        });
    }, [])

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta" />

                <Link to="/">
                  <FiArrowLeft></FiArrowLeft>   
                  <span></span>
                  Voltar para home
                </Link>
            </header>
            <form>
                <h1>Cadastro do < br /> ponto de coleta</h1>

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Nome da entidade</label>
                        <input 
                        type="text" 
                        name="name"
                        id="name"
                        />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input 
                              type="email" 
                              name="email"
                              id="email"
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input 
                            type="text" 
                            name="whatsapp"
                            id="whatsapp"
                            />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereços</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <Map center={[-21.8386025, -48.1299912]} zoom={15}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Marker position={[-21.8386025, -48.1299912]}></Marker>
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select 
                               name="uf" 
                               id="uf"
                            >
                                <option value="0">Selecione uma UF</option>
                                {ufs.map(uf => (
                                    <option key={uf} value={uf}>{uf}</option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="uf">Cidade</label>
                            <select name="city" id="city">
                                <option value="0">Selecione uma cidade</option>
                            </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Ítens de coleta</h2>
                        <span>Selecione um ou mais ítens abaixo</span>
                    </legend>

                    <ul className="items-grid">
                      {items.map(item => (
                        <li key={item.id}>
                          <img src={item.image_url} alt={item.title}></img>
                          <span>{item.title}</span>
                        </li>
                      ))}
                    </ul>
                </fieldset>

                <button type="submit">Cadastrar ponto de coleta</button>
            </form>
        </div>
    );
};

export default CreatePoint;