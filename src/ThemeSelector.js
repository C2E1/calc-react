import {useContext} from 'react';
import ThemeContext from './ThemeContext';

const ThemeSelector = () => {
    const [theme, setTheme] = useContext(ThemeContext);

    return(
        <div>
            <label htmlFor="theme">
                Theme
                <select
                    value={theme}
                    onChange={e => setTheme(e.target.value)}
                    onBlur={e => setTheme(e.target.value)}>
                        <option value="iphone">Iphone</option>
                        <option value="lean">Lean</option>
                </select>
            </label>
        </div>
    )
}

export default ThemeSelector;