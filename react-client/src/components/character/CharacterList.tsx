import React from 'react'
import {Table} from 'react-bootstrap';
import {Character} from "../shadowland/model/Character";
import {filter, map} from "underscore";
import CharacterTableDetail from "./CharacterTableDetail";

type CharacterListProps = {
    filteredList: Array<Character>,
    title: string,
    addCharacter: (arg0: Character) => void
}

type CharacterListState = {
    filterString: string,
}


class CharacterList extends React.Component<CharacterListProps,CharacterListState> {
    state = {
        filterString: ""
    }


    render() {
        const {filterString} = this.state;
        const {title, filteredList} = this.props;


        const textFilteredList = filterString ? filter(filteredList, (character :Character) => {
            return character.name.toLowerCase().includes(filterString.toLowerCase())
        }) : filteredList;

        return (
            <div>
                <p>{title}</p>
                <label>
                    Search
                    <input onChange={event => this.searchFilterText(event)}/>
                </label>
                <Table striped bordered hover variant="dark">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Affinity</th>
                        <th>Gender</th>
                        <th>Side</th>
                    </tr>
                    </thead>
                    <tbody>
                    {textFilteredList && map(textFilteredList, (character: Character) => {
                        return (
                            <>
                            <CharacterTableDetail key={character.id} addCharacter={this.props.addCharacter} character={character} />
                            </>
                        )
                    })}
                    </tbody>
                </Table>
            </div>
        )
    }

    private searchFilterText(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({filterString: event.target.value})
    }
}
export default CharacterList;
