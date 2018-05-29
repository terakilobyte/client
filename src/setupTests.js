import { configure } from "enzyme"
import Adapter from "../test/ReactSixteenAdapter"

configure({ adapter: new Adapter() })
