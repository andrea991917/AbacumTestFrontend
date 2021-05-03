
# Test Frontend Engineer Abacum

Este proyecto consiste en crear el juego "Rock, Paper, Scissors, Lizard, Spock", que principalmente sea capaz de:
- Generar dos jugadores aleatorios
- Asignar aleatoriamente a cada jugador un movimiento(Rock, Paper, Scissors, Lizard, Spock)
- Según las reglas proporcionadas, en cada partida se escogerá un jugador ganador y se le sumara un punto, o se determinara como un empate, en caso que ambos jugadores tengan el mismo movimiento, en este último caso, no habrá punto para ningun jugador.
- Mostrar el puntaje de ambos jugadores durante toda la partida.
- Al recargar la página el estado de la partida se conserva.
- Después de 5 rondas, el jugador con mayor puntaje es declarado ganador y se puede restaurar el juego, y el puntaje se reinicia.

esto ha sido desarrollado como prueba técnica de Abacum para el puesto de Frontend Engineer.

El proyecto ha sido desarrollado con React y TypeScript, cuenta con sus respectivos test y vista adaptable a diferentes dispositivos (móvil, tablet y desktop). Para los estilos del mismo, se ha utilizado sass implementando la metodología BEM (Block-Element-Modifier). 

Además se ha desplegado para facilitar la visualización e interacción con el mismo por parte del equipo de Abacum. Se puede acceder mediante este enlace:https://abacum-test-frontend.vercel.app/

### Componentes

Para el desarrollo de la interfaz he utilizado los componentes de https://material-ui.com/, además de crear dos componentes personalizados:

-Player: He utilizado un Badge que contiene dos avatar, el más grande muestra para mostrar el movimiento asignado aleatoriamente para el jugador, y uno pequeño que representa la imagen del jugador. El componente recibe las propiedades de la interfaz IPlayerCard que permite establecer la posición del componente del avatar pequeño y las propiedades del jugador que se mostraran, que en nuestro caso es la imagen.

-Timeline: Componente que contiene la imagen del jugador que ha ganado cada ronda, junto con un paper que indica quién ha sido el ganador y cual ha sido su movimiento. A este componente le pasamos un histórico de todas las rondas del juego.

Dentro de este componente tenemos funciones como getWinnerText(), que devuelve el texto correspondiente a la jugada que se realizó. Para evitar hacerlo con switch o con if, y para facilitar futuras modificaciones, se ha implementado con un array.


### Servicio Game

Función getMove(): nos devuelve un movimiento aleatorio de los permitidos.

Función checkMove(): recibe dos movimientos y verifica si el movimiento 1 vence al movimiento 2

Función getWinner(): recibe como parametro dos movimientos y devuelve un enum que identifica al ganador.

### Game.tsx
Esta clase contiene todos los componentes anteriores y las diferentes partes de las vistas, separadas en funciones y con condicionales para que se muestren únicamente en el momento adecuado.

Para cargar y guardar el estado del juego cuando se refresque la ventana, se guardan los datos en el local storage y se implementó esta lógica dentro del useEffect().

### Test
Se hicieron dos test para la función de checkMove() y getWinner(), ambas usan la misma lógica. Como se deben de probar todas las combinaciones de movimientos entre sí, los resultados de los test se guardan en un array, el cual con dos bucles for van ejecutando movimiento por movimiento y comparándolo con el resultado esperado indicado en el array.

--- 
In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.



