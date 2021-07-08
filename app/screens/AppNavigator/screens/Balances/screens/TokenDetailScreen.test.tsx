import { fireEvent, render } from "@testing-library/react-native";
import * as React from "react";
import { TokenDetailScreen } from "./TokenDetailScreen";

describe('token detail screen', () => {
  it('should accept DST', async () => {
    const navigation: any = {
      navigate: jest.fn(),
    }
    const route: any = {
      params: {
        token: {
          id: '1',
          symbol: 'BTC',
          symbolKey: 'BTC',
          isDAT: true,
          isLPS: false,
          amount: '100000',
          name: 'Bitcoin'
        }
      }
    }
    const spy = jest.spyOn(navigation, 'navigate')
    const component = (
      <TokenDetailScreen navigation={navigation} route={route} />
    );
    const rendered = render(component)
    const sendButton = await rendered.findByTestId('send_button')
    fireEvent.press(sendButton)
    expect(rendered.toJSON()).toMatchSnapshot()
    expect(spy).toHaveBeenCalled()
  })

  it('should accept UTXO DFI', async () => {
    const navigation: any = {
      navigate: jest.fn(),
    }
    const route: any = {
      params: {
        token: {
          id: '0_utxo',
          symbol: 'DFI',
          symbolKey: 'DFI',
          isDAT: true,
          isLPS: false,
          amount: '100000',
          name: 'Defichain'
        }
      }
    }
    const spy = jest.spyOn(navigation, 'navigate')
    const component = (
      <TokenDetailScreen navigation={navigation} route={route} />
    );
    const rendered = render(component)
    const receiveButton = await rendered.findByTestId('receive_button')
    fireEvent.press(receiveButton)
    expect(rendered.toJSON()).toMatchSnapshot()
    expect(spy).toHaveBeenCalled()
  })

  it('should accept Token DFI', async () => {
    const navigation: any = {
      navigate: jest.fn(),
    }
    const route: any = {
      params: {
        token: {
          id: '0',
          symbol: 'DFI',
          symbolKey: 'DFI',
          isDAT: true,
          isLPS: false,
          amount: '100000',
          name: 'Defichain'
        }
      }
    }
    const spy = jest.spyOn(navigation, 'navigate')
    const component = (
      <TokenDetailScreen navigation={navigation} route={route} />
    );
    const rendered = render(component)
    const convertButton = await rendered.findByTestId('convert_button')
    fireEvent.press(convertButton)
    expect(rendered.toJSON()).toMatchSnapshot()
    expect(spy).toHaveBeenCalled()
  })
})