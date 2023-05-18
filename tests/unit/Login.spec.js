//import Vue from 'vue'
import VueTestUtils from '@vue/test-utils'
import axios from 'axios'
import {expect, jest} from '@jest/globals';

//import { API_BASE_URL } from "../../src/config/api.js";

import Login from '../../src/views/Login.vue'

describe('Login', () => {
  it('should render the correct text', () => {
    const wrapper = VueTestUtils.mount(Login)

    expect(wrapper.text()).toContain('Login')
    expect(wrapper.text()).toContain('Email')
    expect(wrapper.text()).toContain('Contraseña')
    expect(wrapper.text()).toContain('Ingresar')
    expect(wrapper.text()).toContain('Registrate')
  })

  it('should call the login method when the login button is clicked', () => {
    const loginMock = jest.fn();
    const wrapper = VueTestUtils.shallowMount(Login)
    wrapper.vm.login = loginMock;
    wrapper.find('button[type="submit"]').trigger('click')

    expect(wrapper.vm.login).toHaveBeenCalled()
  })

  it('should redirect to dashboardProfesores after successful login', async () => {
    axios.post = jest.fn();
    const mockRoute = {
      path: '/dashboardProfesores'
    };

    const mockRouter = {
      push: jest.fn()
    };

    const wrapper = VueTestUtils.mount(Login, {
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter
        }
      }
    });
    
    axios.post.mockResolvedValue({ data: { token: 'your_mocked_token' } });

    wrapper.setData({ email: 'test@example.com', password: 'password123' });
    await wrapper.find('button').trigger('click');

    expect(mockRouter.push).toHaveBeenCalledWith('dashboardProfesores');
  });

  it('should thrown error on login failure', async () => {
    const mockRoute = {
      path: '/dashboardProfesores'
    };

    const mockToast = {
      error:'Invalid credentials'
    };

    const mockRouter = {
      push: jest.fn()
    };

    const wrapper = VueTestUtils.mount(Login, {
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
          toast: mockToast
        }
      }
    });
    // Mock failed login response
    const error = { response: { data: { message: 'Invalid credentials' } } };
    wrapper.vm.login = jest.fn().mockRejectedValueOnce(error);
  
    await expect(wrapper.vm.login()).rejects.toEqual(error); // Asegúrate de devolver una promesa rechazada con el error
  
  });
 
})