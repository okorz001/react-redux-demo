import React from 'react'

import styles from './App.css'
import Bar from './Bar'
import Counter from './Counter'
import Foo from './Foo'

const App = () =>
    <main className={styles.app}>
        <Foo />
        <Bar />
        <Counter />
    </main>

export default App
