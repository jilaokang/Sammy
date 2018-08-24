import * as React from 'react';

import { WiredCard, WiredIconButton } from 'react-wired-element';

class Search extends React.Component<{ onClose: any }> {
    public render() {
        const { onClose } = this.props;
        return (
            <section className="search-container animated slideInDown">
                <WiredCard class="search">
                    <section className="close" onClick={onClose}><WiredIconButton>clear</WiredIconButton></section>
                </WiredCard>
            </section>
        );
    }
}

export default Search;
