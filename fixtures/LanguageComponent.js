import React from 'react';
import PropTypes from 'prop-types';
import {CustomSelect, Buttons, notAComponentShouldBeIgnored } from '../../atoms';

const propTypes = {
    locationPathname: PropTypes.string.isRequired,
    csrfToken: PropTypes.string.isRequired,
    availableLanguages: PropTypes.arrayOf(PropTypes.object).isRequired,
    translations: PropTypes.shape({
        chooseLanguage: PropTypes.string.isRequired
    }).isRequired
};

export default class languageCode extends React.Component {
    render() {
        const {
            availableLanguages,
            csrfToken,
            locationPathname,
            translations
        } = props;

        const languageCode = locationPathname.slice(1, 3);

        return (
            <form action="/change-language" method="POST" className="language-form">
                <input type="hidden" name="_csrf" value={csrfToken} />
                <input type="hidden" name="url" value={locationPathname} />

                {
                    [1].map((item, key) => (
                        <CustomSelect
                            options={availableLanguages}
                            name="language"
                            optionValuePropertyName="code"
                            optionTextPropertyName="displayName"
                            defaultValue={languageCode}
                            item={item}
                            key={key}
                />
                    ))
                }

                <Input
                    type="submit"
                    className="button-cta"
                    value={translations.chooseLanguage}
                />
            </form>
        );
    }
};