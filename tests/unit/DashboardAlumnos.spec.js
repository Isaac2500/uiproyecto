//import Vue from 'vue'
//import VueTestUtils from '@vue/test-utils'
import VueTestUtils from '@vue/test-utils'
//import axios from 'axios'
import {expect, jest} from '@jest/globals';


import DashboardAlumnos from '../../src/views/DashboardAlumnos.vue'

describe('DashboardProfesores', () => {
    it('should render the correct text', () => {
    const wrapper = VueTestUtils.mount(DashboardAlumnos)
      expect(wrapper.text()).toContain('Alumnos')
      expect(wrapper.text()).toContain('Id')
      expect(wrapper.text()).toContain('Nombre(s)')
      expect(wrapper.text()).toContain('Apellido Paterno')
      expect(wrapper.text()).toContain('Apellido Materno')
      expect(wrapper.text()).toContain('Matricula')
      expect(wrapper.text()).toContain('Promedio')
    })
  
    it('should call the fetchProfesores method when mounted', () => {
        const fetchAlumnosMock = jest.fn();
        const wrapper = VueTestUtils.mount(DashboardAlumnos)
        wrapper.vm.fetchAlumnos = fetchAlumnosMock;
      
        
        wrapper.vm.fetchAlumnos()
  
        expect(wrapper.vm.fetchAlumnos).toHaveBeenCalled()
    })
  
    it('should thrown an error if the fetchProfesores method fails',async () => {
        const wrapper = VueTestUtils.mount(DashboardAlumnos);
  
        const error = { response: { data: { message: 'Error al cargar los profesores' } } };
        wrapper.vm.login = jest.fn().mockRejectedValueOnce(error);
        await expect(wrapper.vm.login()).rejects.toEqual(error);
      
    })
  
    /* it('should show a table with the profesores when the fetchProfesores method succeeds', async () => {
        axios.get = jest.fn();

        
        const mockRoute = {
          path: '/dashboardProfesores'
        };
    
        const mockRouter = {
          push: jest.fn()
        };
    
        const wrapper = VueTestUtils.mount(DashboardProfesores, {
          global: {
            mocks: {
              $route: mockRoute,
              $router: mockRouter
            }
          }
        });
        
        axios.get.mockResolvedValue({ data: [{
            id: 1,
            nombres: 'Juan',
            apellidoPaterno: 'Perez',
            apellidoMaterno: 'Gonzalez',
            numeroEmpleado: 123456,
            horasClase: 20
        }]});
  
      // Mock the Axios instance to return a successful response when trying to fetch the profesores
  
      wrapper.vm.fetchProfesores()
  
      expect(wrapper.find('table').exists()).toBeTruthy()
      expect(wrapper.find('table tr').length).toBe(1)
      expect(wrapper.find('table tr td').at(0).text()).toBe('1')
      expect(wrapper.find('table tr td').at(1).text()).toBe('Juan')
      expect(wrapper.find('table tr td').at(2).text()).toBe('Perez')
      expect(wrapper.find('table tr td').at(3).text()).toBe('Gonzalez')
      expect(wrapper.find('table tr td').at(4).text()).toBe('123456')
      expect(wrapper.find('table tr td').at(5).text()).toBe('20')
    }) */
  })