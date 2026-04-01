import { useState } from 'react';

function AddItem() {

    const [item, setItem] = useState({

        kategoria: "",
        nimi: "",
        valmistaja: "",
        hinta: 0,
        myyty: false

    })

    const change = (e) => {
        setItem({
            ...item,
            [e.target.name]: e.target.value
        });


    };

    const AddItemToList = () => {
        setItem({
            kategoria: "",
            nimi: "",
            valmistaja: "",
            hinta: 0,
            myyty: false
        });
    }

    return (
        <>
            <form>
                <label>Nimi
                    <input type='text' name='nimi' value={item.nimi} onChange={(e) => change(e)} /><br />
                </label>
                <label>Valmistaja
                    <input type='text' name='valmistaja' value={item.valmistaja} onChange={(e) => change(e)} /><br />
                </label>
                <label>Hinta
                    <input type='text' name='hinta' value={item.hinta} onChange={(e) => change(e)} /><br />
                </label>
                <label>Kategoria
                    <input type='text' name='kategoria' value={item.kategoria} onChange={(e) => change(e)} /><br />
                </label>
                <input type='button' value='Lisää' onClick={() => AddItemToList()} />
            </form>
        </>
    );

}
export default AddItem;