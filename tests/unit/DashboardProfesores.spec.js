//import Vue from 'vue'
//import VueTestUtils from '@vue/test-utils'
import VueTestUtils from '@vue/test-utils';

import axios from 'axios';
import { expect, jest } from '@jest/globals';
jest.mock('axios');
import DashboardProfesores from '../../src/views/DashboardProfesores.vue';
import Crear from '../../src/views/Crear.vue';
import Editar from '../../src/views/Editar.vue';
const MODEL_NAME = 'profesor';
const listaProfesores = [
  {
    id: 1,
    nombres: 'Ben',
    apellidoPaterno: 'Beckman',
    apellidoMaterno: '',
    numeroEmpleado: 11111222,
    horasClase: 10,
  },
];
const AUTH_OBJECT = {
  headers: {
    Authorization: 'authorization null',
  },
};
import { API_BASE_URL } from '../../config/api';

describe('DashboardProfesores', () => {
  it(`should render ${MODEL_NAME} dashboard`, async () => {
    axios.get.mockResolvedValue({ data: listaProfesores });

    const wrapper = VueTestUtils.shallowMount(DashboardProfesores);

    expect(wrapper.text()).toContain('Profesores');
    expect(wrapper.text()).toContain('Id');
    expect(wrapper.text()).toContain('Nombre(s)');
    expect(wrapper.text()).toContain('Apellido Paterno');
    expect(wrapper.text()).toContain('Apellido Materno');
    expect(wrapper.text()).toContain('Numero de Empleado');
    expect(wrapper.text()).toContain('Horas Clase');
    expect(wrapper.text()).toContain('Crear Nuevo');
    expect(axios.get).toHaveBeenCalledWith(
      `${API_BASE_URL}/profesores`,
      AUTH_OBJECT
    );

    await wrapper.vm.fetchProfesores();
    await wrapper.vm.$nextTick();

    // Wait api list
    // Get the rendered table rows
    const tableRows = wrapper.findAll('tbody tr');

    // Assert that the table contains the correct number of rows
    expect(tableRows).toHaveLength(1);

    // Assert that the table rows contain the expected data
    expect(tableRows[0].text()).toContain('1');
    expect(tableRows[0].text()).toContain('Ben');
    expect(tableRows[0].text()).toContain('Beckman');
    // Reload the component by remounting it
    wrapper.unmount();
  });

  it(`should redirect to /crear/${MODEL_NAME}`, async () => {
    const wrapper = VueTestUtils.shallowMount(DashboardProfesores, {
      global: {
        mocks: {
          $router: {
            push: jest.fn(),
          },
        },
      },
    });
    await wrapper.find('#createUser').trigger('click');
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/crear/profesores');
  });

  it(`should redirect to /editar/${MODEL_NAME}`, async () => {
    // Init a dashboard
    const wrapper = VueTestUtils.shallowMount(DashboardProfesores, {
      global: {
        mocks: {
          $router: {
            push: jest.fn(),
          },
        },
      },
    });

    //Reload data
    await wrapper.setData({
      listaProfesores,
    });
    await wrapper.vm.$nextTick();

    // Check if edit button is available
    const firstId = wrapper.find('tbody tr th:first-child').text();
    const buttonEdit = wrapper.find('tbody tr td:nth-child(7) b-button');

    //Trigger a click and redirect to correct route
    await buttonEdit.trigger('click');
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith(
      '/editar/' + firstId + '/profesores'
    );
    wrapper.unmount();
  });

  it(`should create a new ${MODEL_NAME}`, async () => {
    const wrapper = VueTestUtils.shallowMount(Crear, {
      global: {
        mocks: {
          $router: {
            push: jest.fn(),
          },
          $route: {
            path: '/crear/profesores',
            push: jest.fn(),
          },
        },
      },
    });
    await wrapper.vm.$nextTick();

    // Check form labels
    expect(wrapper.text()).toContain('Nombre(s)');
    expect(wrapper.text()).toContain('Apellido Paterno');
    expect(wrapper.text()).toContain('Numero de Empleado');
    expect(wrapper.text()).toContain('Apellido Materno');
    expect(wrapper.text()).toContain('Horas Clase');

    //Fill inputs
    wrapper.find('#form_name').setValue('Shanks');
    wrapper.find('#form_apellidoPaterno').setValue('Akagami');
    wrapper.find('#form_apellidoMaterno').setValue('');
    wrapper.find('#form_numeroEmpleado').setValue(1111123);
    wrapper.find('#form_horasClase').setValue(15);

    // Create mock post method
    const newProfesor = {
      id: 2,
      apellidoMaterno: '',
      apellidoPaterno: 'Akagami',
      horasClase: 15,
      nombres: 'Shanks',
      numeroEmpleado: 1111123,
    };
    axios.post.mockResolvedValue({ data: newProfesor });
    await wrapper.find('#send-profesor').trigger('click');

    // Check post API is called
    expect(axios.post).toHaveBeenCalledWith(
      `${API_BASE_URL}/profesores`,
      {
        apellidoMaterno: '',
        apellidoPaterno: 'Akagami',
        horasClase: 15,
        nombres: 'Shanks',
        numeroEmpleado: 1111123,
      },
      {
        headers: {
          Authorization: 'Bearer null',
        },
      }
    );

    // Check redirect to dashboard
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith(
      '/dashboardprofesores'
    );
    wrapper.unmount();
  });

  it(`should edit a ${MODEL_NAME}`, async () => {
    // Create mock post method
    const curretProfesor = {
      id: 2,
      apellidoMaterno: '',
      apellidoPaterno: 'Akagami',
      horasClase: 15,
      nombres: 'Shanks',
      numeroEmpleado: 1111123,
    };
    axios.get.mockResolvedValue({ data: curretProfesor });

    // Render component
    const wrapper = VueTestUtils.mount(Editar, {
      global: {
        mocks: {
          $router: {
            push: jest.fn(),
          },
          $route: {
            path: '/editar/profesores',
            params: {
              id: 2,
            },
          },
        },
      },
    });

    // Check get by ID API is called
    expect(axios.get).toHaveBeenCalledWith(
      `${API_BASE_URL}/${MODEL_NAME}es/2`,
      {
        headers: {
          Authorization: 'Bearer null',
        },
      }
    );
    await wrapper.vm.getRegister();
    await wrapper.vm.$nextTick();

    // Check form labels
    expect(wrapper.text()).toContain('Nombre(s)');
    expect(wrapper.text()).toContain('Apellido Paterno');
    expect(wrapper.text()).toContain('Numero de Empleado');
    expect(wrapper.text()).toContain('Apellido Materno');
    expect(wrapper.text()).toContain('Horas Clase');

    //Check inputs has current data from profesor
    expect(wrapper.find('#form_name').element.value).toContain('Shanks');
    expect(wrapper.find('#form_apellidoPaterno').element.value).toContain(
      'Akagami'
    );
    expect(wrapper.find('#form_apellidoMaterno').element.value).toContain('');
    expect(wrapper.find('#form_numeroEmpleado').element.value).toContain(
      '1111123'
    );
    expect(wrapper.find('#form_horasClase').element.value).toContain('15');

    //Update field
    wrapper.find('#form_apellidoMaterno').setValue('Yonkō');

    // Mock API put call
    axios.put.mockResolvedValue({
      data: { ...curretProfesor, apellidoMaterno: 'Yonkō' },
    });

    //Trigger update event
    await wrapper.find(`#send-${MODEL_NAME}`).trigger('click');

    // Check put API is called
    expect(axios.put).toHaveBeenCalledWith(
      `${API_BASE_URL}/${MODEL_NAME}es/2`,
      {
        apellidoMaterno: 'Yonkō',
        apellidoPaterno: 'Akagami',
        horasClase: 15,
        nombres: 'Shanks',
        numeroEmpleado: 1111123,
      },
      {
        headers: {
          Authorization: 'Bearer null',
        },
      }
    );

    // Check redirect to dashboard
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith(
      '/dashboardprofesores'
    );
    wrapper.unmount();
  });

  it(`should delete a ${MODEL_NAME}`, async () => {
    axios.get.mockResolvedValue({ data: listaProfesores });
    // Init a dashboard
    const wrapper = VueTestUtils.shallowMount(DashboardProfesores, {
      global: {
        mocks: {
          $router: {
            push: jest.fn(),
          },
        },
      },
    });

    // Wait api list
    await wrapper.vm.fetchProfesores();
    await wrapper.vm.$nextTick();

    // Get the rendered table rows
    const tableRows = wrapper.findAll('tbody tr');
    // Assert that the table contains the correct number of rows
    expect(tableRows).toHaveLength(1);

    // Check if delete button is available on first row
    const firstId = wrapper.find('tbody tr th:first-child').text();
    const buttonDelete = wrapper.find('tbody tr td:nth-child(8) b-button');

    // Mock API delete call
    axios.delete.mockResolvedValue({
      data: listaProfesores[0],
    });
    axios.get.mockResolvedValue({ data: [] });

    //Trigger a click and redirect to correct route
    await buttonDelete.trigger('click');

    // Check delete API is called
    expect(axios.delete).toHaveBeenCalledWith(
      `${API_BASE_URL}/${MODEL_NAME}es/${firstId}`,
      AUTH_OBJECT
    );

    expect(wrapper.vm.$router.push).toHaveBeenCalledWith(
      `/dashboard${MODEL_NAME}es`
    );
  });
});
