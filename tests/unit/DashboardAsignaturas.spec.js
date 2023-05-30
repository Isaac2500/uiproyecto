import VueTestUtils from '@vue/test-utils';
import { expect, jest } from '@jest/globals';

import DashboardAsignaturas from '../../src/views/DashboardAsignaturas.vue';
import Crear from '../../src/views/Crear.vue';
import Editar from '../../src/views/Editar.vue';

//Mock axios
import axios from 'axios';
jest.mock('axios');

// Mock utilities
const MODEL_NAME = 'asignatura';
const listaAsignaturas = [
  {
    id: 1,
    nombre: 'English',
    descripcion: 'Learn English',
    creditos: 10,
    tipo: 'Language',
    codigo: '22222',
  },
  {
    id: 2,
    nombre: 'Spanish',
    descripcion: 'Learn Spanish',
    creditos: 8,
    tipo: 'Language',
    codigo: '222221',
  },
];
const AUTH_OBJECT = {
  headers: {
    Authorization: 'authorization null',
  },
};
import { API_BASE_URL } from '../../config/api';

describe('Dashboard Asignaturas', () => {
  it(`should render ${MOEDL_NAME} dashboard`, async () => {
    axios.get.mockResolvedValue({ data: listaAsignaturas });

    const wrapper = VueTestUtils.shallowMount(DashboardAsignaturas);

    expect(wrapper.text()).toContain('Asignaturas');
    expect(wrapper.text()).toContain('Id');
    expect(wrapper.text()).toContain('Nombre');
    expect(wrapper.text()).toContain('Descripcion');
    expect(wrapper.text()).toContain('Creditos');
    expect(wrapper.text()).toContain('Tipo');
    expect(wrapper.text()).toContain('Codigo');

    expect(axios.get).toHaveBeenCalledWith(
      `${API_BASE_URL}/asignaturas`,
      AUTH_OBJECT
    );

    await wrapper.vm.fetchAsignaturas();
    await wrapper.vm.$nextTick();

    // Wait api list
    // Get the rendered table rows
    const tableRows = wrapper.findAll('tbody tr');

    // Assert that the table contains the correct number of rows
    expect(tableRows).toHaveLength(2);

    // Assert that the table rows contain the expected data
    expect(tableRows[0].text()).toContain('Language');
    expect(tableRows[0].text()).toContain('English');
    expect(tableRows[1].text()).toContain('Spanish');
    // Reload the component by remounting it
    wrapper.unmount();
  });

  it(`should redirect to /crear/${MODEL_NAME}s`, async () => {
    const wrapper = VueTestUtils.shallowMount(DashboardAsignaturas, {
      global: {
        mocks: {
          $router: {
            push: jest.fn(),
          },
        },
      },
    });
    await wrapper.find(`#create-${MODEL_NAME}`).trigger('click');
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith(
      `/crear/${MODEL_NAME}s`
    );
    wrapper.unmount();
  });

  it(`should redirect to /editar/${MODEL_NAME}s`, async () => {
    // Init a dashboard
    const wrapper = VueTestUtils.shallowMount(DashboardAsignaturas, {
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
      listaAsignaturas,
    });
    await wrapper.vm.$nextTick();

    // Check if edit button is available
    const firstId = wrapper.find('tbody tr th:first-child').text();
    const buttonEdit = wrapper.find('tbody tr td:nth-child(7) b-button');

    //Trigger a click and redirect to correct route
    await buttonEdit.trigger('click');
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith(
      '/editar/' + firstId + '/asignaturas'
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
            path: '/crear/asignaturas',
            push: jest.fn(),
          },
        },
      },
    });
    await wrapper.vm.$nextTick();

    // Check form labels
    expect(wrapper.text()).toContain('Nombre');
    expect(wrapper.text()).toContain('Descripcion');
    expect(wrapper.text()).toContain('Creditos');
    expect(wrapper.text()).toContain('Tipo');
    expect(wrapper.text()).toContain('Codigo');

    //Fill inputs

    wrapper.find('#form_name').setValue('Artes');
    wrapper.find('#form_descripcion').setValue('Artes basicas');
    wrapper.find('#form_creditos').setValue(5);
    wrapper.find('#form_tipo').setValue('Artisticas');
    wrapper.find('#form_codigo').setValue(99999);

    // Create mock post method
    const newAsignatura = {
      id: 3,
      name: 'Artes',
      descripcion: 'Artes basicas',
      creditos: 5,
      tipo: 'Artisticas',
      codigo: 99999,
    };
    axios.post.mockResolvedValue({ data: newAsignatura });
    await wrapper.find(`#send-${MODEL_NAME}`).trigger('click');

    // Check post API is called
    expect(axios.post).toHaveBeenCalledWith(
      `${API_BASE_URL}/asignaturas`,
      {
        nombre: 'Artes',
        descripcion: 'Artes basicas',
        creditos: 5,
        tipo: 'Artisticas',
        codigo: '99999',
      },
      {
        headers: {
          Authorization: 'Bearer null',
        },
      }
    );

    // Check redirect to dashboard
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith(
      '/dashboardasignaturas'
    );
    wrapper.unmount();
  });

  it(`should edit a ${MODEL_NAME}`, async () => {
    // Create mock get method
    const currentAsignatura = listaAsignaturas[0];
    axios.get.mockResolvedValue({ data: currentAsignatura });

    // Render component
    const wrapper = VueTestUtils.shallowMount(Editar, {
      global: {
        mocks: {
          $router: {
            push: jest.fn(),
          },
          $route: {
            path: '/editar/asignaturas',
            params: {
              id: 1,
            },
          },
        },
      },
    });

    // Check get by ID API is called
    expect(axios.get).toHaveBeenCalledWith(`${API_BASE_URL}/${MODEL_NAME}s/1`, {
      headers: {
        Authorization: 'Bearer null',
      },
    });

    await wrapper.vm.getRegister();
    await wrapper.vm.$nextTick();

    // Check form labels
    expect(wrapper.text()).toContain('Nombre');
    expect(wrapper.text()).toContain('Descripcion');
    expect(wrapper.text()).toContain('Creditos');
    expect(wrapper.text()).toContain('Tipo');
    expect(wrapper.text()).toContain('Codigo');

    //Check inputs has current data from alumno
    expect(wrapper.find('#form_name').element.value).toContain('English');
    expect(wrapper.find('#form_descripcion').element.value).toContain(
      'Learn English'
    );
    expect(wrapper.find('#form_creditos').element.value).toContain('10');
    expect(wrapper.find('#form_tipo').element.value).toContain('Language');
    expect(wrapper.find('#form_codigo').element.value).toContain('22222');

    //Update field
    wrapper.find('#form_codigo').setValue('10000');

    // Mock API put call
    axios.put.mockResolvedValue({
      data: { ...currentAsignatura, codigo: '10000' },
    });

    //Trigger update event
    await wrapper.find(`#send-${MODEL_NAME}`).trigger('click');

    // Check put API is called
    expect(axios.put).toHaveBeenCalledWith(
      `${API_BASE_URL}/${MODEL_NAME}s/1`,
      {
        nombre: 'English',
        descripcion: 'Learn English',
        creditos: 10,
        tipo: 'Language',
        codigo: '10000',
      },
      {
        headers: {
          Authorization: 'Bearer null',
        },
      }
    );

    // Check redirect to dashboard
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith(
      '/dashboardasignaturas'
    );
    wrapper.unmount();
  });

  it(`should delete a ${MODEL_NAME}`, async () => {
    axios.get.mockResolvedValue({ data: listaAsignaturas });
    // Init a dashboard
    const wrapper = VueTestUtils.shallowMount(DashboardAsignaturas, {
      global: {
        mocks: {
          $router: {
            push: jest.fn(),
          },
        },
      },
    });

    // Wait api list
    await wrapper.vm.fetchAsignaturas();
    await wrapper.vm.$nextTick();

    // Get the rendered table rows
    const tableRows = wrapper.findAll('tbody tr');
    // Assert that the table contains the correct number of rows
    expect(tableRows).toHaveLength(2);

    // Check if delete button is available on first row
    const firstId = wrapper.find('tbody tr th:first-child').text();
    const buttonDelete = wrapper.find('tbody tr td:nth-child(8) b-button');

    // Mock API delete call
    axios.delete.mockResolvedValue({
      data: listaAsignaturas[0],
    });
    axios.get.mockResolvedValue({ data: [listaAsignaturas[1]] });

    //Trigger a click and redirect to correct route
    await buttonDelete.trigger('click');

    // Check delete API is called
    expect(axios.delete).toHaveBeenCalledWith(
      `${API_BASE_URL}/${MODEL_NAME}s/${firstId}`,
      AUTH_OBJECT
    );

    expect(wrapper.vm.$router.push).toHaveBeenCalledWith(
      `/dashboard${MODEL_NAME}s`
    );

    wrapper.unmount();
  });
});
